const Post = require('../models/post.models'); 

module.exports.create = (req, res, next) => {
    const data = ({title, text, author} = req.body);
    Post.create(data)
    .then(post => res.status(201).json(post))
    .catch(next); 

} 

module.exports.listById = (req, res, next) => {
    Post.findById(req.params.id)
    .then(post => post ? res.status(200).json(post) : res.status(404).json({
            message: "Post doesn't exist"
        })
    ); 
}

module.exports.list = (req, res, next) => {
    Post.find()
    .then(employees => res.status(200).json(employees))
    .catch(next); 
}

module.exports.update = (req, res, next) => {
    const data = ({title, text, author} = req.body);
    Post.findByIdAndUpdate(req.params.id, data)
    .then(post => post ? res.status(200).json(post): res.status(404).json({
        message: "Post doesn't exist"
    }))
    .catch(next); 
}

module.exports.delete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
    .then(post => 
        post ? res.status(204) : res.status(404).json({
            message: "Post doesn't exist"
        }))
    .catch(next);
}