const mongoose = require('mongoose');

require('mongoose'); 

const schema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        maxlength: 5
    }, 
    text: {
        type: String, 
        required: true, 
        minlength: 5
    }, 
    author: {
        type: String, 
        required: true
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

const Post = mongoose.model("Post", schema); 

module.exports = Post; 