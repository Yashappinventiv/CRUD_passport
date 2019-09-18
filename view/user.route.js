const express = require('express');
const router = express.Router() ;
const userController = require('../controller/user.control')


router.post('/signup' , (req,res) => {
    userController.signup(req,res);
})

router.post('/login' , (req,res) => {
userController.loginuser(req,res)
})

router.get('/view' , userController.verifyToken , (req,res) => {
    userController.viewDetails(req,res)
})

router.get('/:type' , userController.verifyToken , (req,res) => {
    userController.individualType(req,res)
} )

module.exports = router ;