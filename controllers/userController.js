//Create user
const User = require('../models/UserModel')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


exports.createUser = async (req, res) => {
   
    const errors = validationResult(req)
    if(!errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array()})
    }
    
    const { email, password, repeat} = req.body
   try {
       //Verificando si el email ya ha sido utilizado
       let user = await User.findOne({ email });

       if(user){
           return res.status(400).json({ msg: 'The email is already in use'})
       }

       user = new User(req.body);

       const salt = await bcryptjs.genSalt(10)
       user.password = await bcryptjs.hash(password, salt)
       user.repeat = await bcryptjs.hash(repeat, salt)
       
       await user.save()

       //JWT
       const payload = {
           user: {
               id: user.id
           }
       }

       //Firmar JWT
       jwt.sign(payload, process.env.SECRET, {
           expiresIn: 12800
       }, (err, token)=> {
           if(err) throw error;

           res.json({ token })
       })



   } catch (error) {
       console.log(error)
       res.status(400).send('There was an error during the registration')
   }

}
