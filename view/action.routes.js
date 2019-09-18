const express = require('express');
const routes = express.Router() ;
const actionController = require('../controller/action.control')
const userController = require('../controller/user.control')

routes.post('/:postId/likes' ,userController.verifyToken  ,(req,res) => {
    actionController.likes(req,res)
})

routes.post('/:postId/comment' ,userController.verifyToken , (req,res) => {
    actionController.comments(req,res)
})

routes.post('/report/:postId' , userController.verifyToken , (req,res) => {
    actionController.report(req,res)
})


module.exports = routes ;