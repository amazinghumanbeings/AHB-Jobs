const jwt = require('jsonwebtoken');
const config = process.env;
const passport = require('passport')

const verifyToken = (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return res.status(403).send("Token required");
    }
    try {
        const decoded = jwt.verify(token,config.SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};



module.exports = verifyToken;