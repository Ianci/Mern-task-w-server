const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){

    //read token from header
    const token = req.header('x-auth-token')
   
    //if there is  token
    if(!token){
        return res.status(401).json({msg : 'There is no token. Permission denied'})
    }
    //validate token
    try {
        const cifred = jwt.verify(token, process.env.SECRET);
        req.user = cifred.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg : 'Invalid token'})
        
    }
}