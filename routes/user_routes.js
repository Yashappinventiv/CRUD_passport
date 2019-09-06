const express = require('express');
const router = express.Router()
const user_controller = require('../controller')

router.post('/signup' , (req,res) => {
    user_controller.signup(req,res);
})

router.post('/login' , (req,res) => {
    user_controller.login(req,res);
})

router.get('/?' , user_controller.verifyToken,  (req,res) => {
    user_controller.getdata(req,res)
})

module.exports = router
