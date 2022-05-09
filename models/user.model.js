const mongoose = require('mongoose'); 
require('mongoose-type-email'); 
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true, 
    }, 
    password: {
        type: String, 
        required: true
    }, 
    bio: {
        type: String
    }, 
    active: {
        type: Boolean, 
        default: false
    }
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id; 
            return ret; 
        }
    }
 }); 

 schema.pre('save', function(next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next(); 
            })
            .catch(next); 
    }
 }); 

 schema.methods.checkPassword = function(pwd) {
     return bcrypt.compare(pwd, this.password); 
 }; 

 const User = mongoose.model("User", schema); 

 module.exports = User; 