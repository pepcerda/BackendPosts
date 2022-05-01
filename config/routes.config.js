const express = require('express');
const router = express.Router(); 
const posts = require('../controllers/posts.controller'); 

router.post('/api/posts', posts.create); 
router.get('/api/posts', posts.list); 
router.get('/api/posts/:id', posts.listById);
router.patch('/api/posts/:id', posts.update); 
router.delete('/api/posts/:id', posts.delete);   

module.exports = router; 