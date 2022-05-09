const User = require('../models/user.model'); 
const createError = require('http-errors'); 
const jwt = require('jsonwebtoken');  

module.exports.create = (req, res, next) => {
    const data = ({name, email, password, bio} = req.body); 

    User.create(data)
    .then(user => res.status(201).json(user))
    .catch(next);  
}

module.exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                user.checkPassword(req.body.password)
                    .then(match => {
                        if(match) {
                            const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                sub: user.id
                              }, process.env.SUPER_SECRET);

                              res.status(200).json({access_token: token}); 

                        } else {
                            createError(401, "invalid credentials"); 
                        }

                    })
                    .catch(next); 
            } else {
                next(createError(401, "invalid credentials"));
            }
        })
}