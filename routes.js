const express = require('express');
const router = express.Router();
const middleware = require('./custom_middleware');
const controller = require('./controller');

router.post('/newtud' , middleware.verifyToken ,  (req,res) => {
     controller.poststud_data(req,res);
})


router.post('/attend?' , middleware.verifyToken ,  (req,res) => {
    controller.post_sub(req,res);
})

router.post('/signup' ,  (req,res) => {
    middleware.signup(req,res)
})

router.get('/' , (req,res) => {
    controller.getdata(req,res);
})

router.post('/login' , (req,res) => {
    middleware.login(req,res);
})

module.exports = router 
