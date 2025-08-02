const jwt = require('jsonwebtoken');
const config = require('config');
//request and response are the objects
//next is the callback function

module.exports = function(req,res,next) {
    //GET token from header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token) {
        return res.status(401).json({msg: "No token, access denied"});
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded.user;
        next();
    }catch(err) {
        res.status(401).json({msg: "Token is not valid"});
    }
}
