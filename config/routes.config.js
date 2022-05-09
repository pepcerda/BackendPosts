const express = require('express');
const router = express.Router(); 
const posts = require('../controllers/posts.controller'); 
const users = require('../controllers/users.controller'); 
const auth = require('../middlewares/auth.middleware'); 

router.post('/api/posts', auth.checkAuth, posts.create); 
router.get('/api/posts', auth.checkAuth, posts.list); 
router.get('/api/posts/:id', auth.checkAuth, posts.listById);
router.patch('/api/posts/:id', auth.checkAuth, posts.update); 
router.delete('/api/posts/:id', auth.checkAuth, posts.delete);   

router.post('/api/users', users.create); 
router.post('/api/login', users.login); 

router.get('/api/:id/validate', users.validate); 

module.exports = router; 