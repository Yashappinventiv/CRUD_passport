const postModel = require('../model/post.models')
const userModel  = require('../model/user.models')

module.exports = {
   async Createpost(req,res){
    
    try{
        let bodydata = req.body ; 
        bodydata.userId = currentId ;

      let value =  await postModel.create(bodydata) ;
      
      await userModel.updateOne({_id : currentId} , {$inc : {postCount  : 1}})
        
      res.status(200).json({
            message : "success",
            data : value
        })
    }catch(e){
          res.status(500).json({
              message : "server error"
          })  
    }
        
    } ,

    async Showpost(req,res){
        try{
            let data = await postModel.find().limit(10)
            // res.status(200).json({
            //     message : "success",
            //     data : data
            // }) 
            res.send(data) 
        }catch(e){
            res.status(500).json({
                message : "server error"
            }) 
        }
    } 
}