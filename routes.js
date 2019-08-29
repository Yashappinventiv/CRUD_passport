const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validation = require('./validation');
const passport = require('./passportdata')

router.get('/' , validation.isAuth ,(req,res) => {
    controller.getdata(req,res);
})

router.get('/:id' , validation.isAuth , (req,res) => {
    controller.getdataByID(req,res);
})

router.post('/' , validation.isAuth , validation.validate ,  (req,res) => {
    controller.postdata(req,res);
})

router.put('/' , validation.isAuth , validation.validate , (req,res) => {
        controller.putdata(req,res);
})



router.delete('/:id' , (req,res) => {
    controller.deletedata(req,res) ; 
})

router.post('/signup',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/err',
                                   failureFlash: false })
);



router.get('/err' , (req,res) => {
    res.status(400).json({
        statusCode : 400 ,
        message : "unsuccesful" ,
        data : "email already exits"
    })
})


router.post("/login" , passport.authenticate('local-login' , {
    successRedirect : "/" ,
    failureRedirect : "/errfail" ,
    failureFlash : false ,
}))


router.get('/errfail' , (req,res) => {
    res.status(400).json({
        statusCode : 400 ,
        message : "unsuccesful" ,
        data : "email  doesnot exits"
    })
})

router.get('/logout' , (req,res) => {
    req.logOut() ;
    res.status(200).json({
        message : "succesfully logout"
    })
})


module.exports = router ;