const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticatUser = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({error: 'Invalid user token.'});
    }

    try{
        const decode = jwt.verify(token.replace('Bearer ', ""), SECRET_KEY);
        req.user = decode; // attach user info to request
        next(); // move to next middleware/controller
    }catch (err){
        return res.status(401).json({error: "User token has expired."});
    }
};

module.exports = {
    authenticatUser
};