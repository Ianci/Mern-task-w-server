//Login User
const User = require('../models/UserModel')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array()})
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ msg: 'There is no account associated with this email'})
        }

        const successPassword = await bcryptjs.compare(password, user.password)
        
        if(!successPassword){
            return res.status(400).json({ msg: 'The password is incorrect'})
        }

            //If password and email is correct, create a jsonwtoken
            //JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        //Firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 7200
        }, (err, token)=> {
            if(err) throw error;

            res.json({ token })
        })
    } catch (error) {
        console.log(error)
        res.status(400).send('There was an error during the login')
    }
}


exports.getUser = async (req, res) => {
    try {
       const user = await User.findById(req.user.id).select('-password -repeat');
       res.json({ user })
    } catch (error) {
        console.log(error)
        res.status(400).send('There was an error during the login')
    }
}
