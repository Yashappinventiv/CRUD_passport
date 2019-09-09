const adminAccess = require('../models/adminaccess');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const productModel = require('../models/products');
const userModel = require('../models/user');


module.exports = {

   async signup(req,res){
    try{
        let {email , password} = req.body ;
        let bodydata = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash_password = bcrypt.hashSync(password, salt);
        bodydata.password = hash_password
        let data = await userModel.create(bodydata);
        

        res.status(200).json({
            message : "success",
            data : data
        })
       }catch(e){
        res.status(500).json({
            message : "server error",
            error : e.message
        })
       }
   }
,
 
    async loginuser(req,res){
        try{
            let {email , password} = req.body ;
            let user_exits = await userModel.find({email : email})
            console.log(user_exits)
            if(user_exits.length > 0){
              let pass = bcrypt.compareSync(password, user_exits[0].password) ;
                   if(pass){
                       let tokken = jwt.sign({id : user_exits._id , email : email} , "secretkeyUser" );
                        console.log(user_exits[0]._id) 
                        currentId = user_exits[0]._id
                        res.status(200).json({
                          message : "succesful",
                          tokken : tokken
                      })  
                     
                   }else{
                      res.status(400).json({
                          message : "password is invalid"
                      }) 
                   }   
            }else{
                  res.status(400).json({
                      message : "email doesnot exits"
                  })
            }    
          }catch(e){
              res.status(500).json({
                  message : "server error",
                  error  : e.message
              })
          }
    }
    
,

async findAllprod(req,res){
        let data = await productModel.aggregate([
            {$project : {_id : 0 , brand : 1 , size : 1 , type : 1  , category : 1 , price  : 1}}
        ])
        // let data = await productModel.find({})
        res.status(200).json({
            message : "All product details" ,
            data : data
        })

    } ,

    async findBy(req,res){
        let param = req.query ; 
        let filter = {}
        if(param.Id){
            filter._id = param.Id ;
        }
        if(param.brand){
            filter.brand = param.brand
        }
        if(param.gender){
            filter.category = param.gender
        }

        let data = await productModel.aggregate([
            {$match : filter} ,
            {$project : {_id : 0 , brand : 1 , size : 1 , type : 1  , category : 1 , price  : 1}}
        ]) 
        res.status(200).json({
            message : "All product details" ,
            data : data
        })
    } ,
    
    verifyToken(req, res, next) {

        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            console.log(bearerHeader)
            const bearer = bearerHeader.split(' ');
            // Get token from array
            console.log(bearer)
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            try {
                console.log(bearerToken);
                var decoded = jwt.verify(bearerToken, 'secretkeyUser');
                console.log(decoded);
                if (typeof decoded !== 'undefined') {
                    next();
                } else {
                    res.sendStatus(403);
                }
            } catch (e) {
                res.status(500).json({
                    message: e.message
                })
            }


        } else {
            // Forbidden
            res.sendStatus(403);
        }
    } ,

   async buyproduct(req,res){
       try{
        let proId = req.params.proId ;
        console.log("id"  ,currentId);
        let update = await userModel.findOne({_id : currentId})  
        update.buys.push(proId) ;
         await update.save()
        console.log(update)  
         res.status(200).json({
             message : "producted added to buys" ,
            //  data : data ,
             update : update
         }) 
       }catch(e){
                res.send(e.message);
       }
          
    }
 ,

 async totalProduct(req,res){
    try{
        let data = await userModel.aggregate([
            {$match : {_id : currentId}} ,
            {$lookup : {
                from  : "product",
                localField : "buys" ,
                foreignFiled : "_id" ,
                as  : "buyHistory"
            } } , 
            {$project : {_id : 0 , buyHistory : 1}}
        ])
        res.status(200).json({
           message : "success" ,
           data  : data
       }) 
    }catch(e){
        res.status(500).json({
            message : "server error" ,
            data  : e.message
        }) 
    }
    

    }
            

}