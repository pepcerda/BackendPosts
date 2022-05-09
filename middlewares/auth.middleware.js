const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken'); 
const User = require('../models/user.model');

module.exports.checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization; 

    const token = authHeader ? authHeader.split(" ")[1] : ""; 

    try{
        var decoded = jwt.verify(token, process.env.SUPER_SECRET); 

        const user = await User.findById(decoded.sub); 
        if(user) {
            req.user=user; 
        } else {
            res.status(401).json({message: "Unauthorized"}); 
        }
        next(); 
    } catch (err) {
        res.status(401).json({message: "Unauthorized"}); 
    }
}