const express = require('express');
const router = express.Router()
const userController = require('../controller/user');

router.post('/signup' , (req,res) => {
        userController.signup(req,res);
})

router.post('/login' , (req,res) => {
    userController.loginuser(req,res)
})

router.get('/findall' , (req,res) => {
      userController.findAllprod(req,res)
})

router.get('/findone?' , (req,res) => {
    userController.findBy(req,res)
})

router.get('/buy/:proId' , userController.verifyToken ,(req,res) => {
    userController.buyproduct(req,res)
})

router.get('/buy/history' , userController.verifyToken , (req,res) => {
    serController.totalProduct(req,res)
})

module.exports = router