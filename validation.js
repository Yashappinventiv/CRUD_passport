const joi = require('joi');

module.exports = {
        validate(req,res , next){
              let bodydata  = req.body ;
               const schema = joi.object().keys({
                    id : joi.string().min(3).max(4).required() ,
                    name : joi.string().required(),
                    dept : joi.string().min(3).max(7).required() ,
                    mobile : joi.string().min(10).max(10).required(),
                    gender : joi.string().valid(['M','F']).required()
                })
                
               joi.validate(bodydata , schema , (err , result) => {
                    if(err){
                        res.status(500).json({
                            statusCode : 500 ,
                            message : "unsuccesful" ,
                            data : err
                        })   
                    }else{
                        next();  
                    }
               } ) 
        } ,

        isAuth : function(req,res,next){
                            
            if(req.isAuthenticated()){
                console.log("login");
                 next() ;
            }else{
                
                res.status(400).json({
                    statusCode : 400 ,
                    message  : "not authorised",
                    data : "login first"
                })
            }
            
}
}