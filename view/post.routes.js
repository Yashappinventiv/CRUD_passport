const express = require('express');
const router = express.Router() ;
const userController = require('../controller/user.control');
const postController = require('../controller/post.control');

router.post('/add' , userController.verifyToken , (req,res) => {
        postController.Createpost(req,res) ;
})

router.get('/getPost' , (req,res) => {
    postController.Showpost(req,res)
})

module.exports = router