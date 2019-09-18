const postModel = require('../model/post.models')
const userModel = require('../model/user.models')
const actionModel = require('../model/postAction.models')
const mongoose = require('mongoose')

module.exports = {

       async likes(req,res){
        try{
              let data = await actionModel.findOne({'likes.userId' : currentId , 'likes.postId' : req.params.postId})   
                if(data){
                  let val =  await actionModel.deleteOne({'likes.userId' : currentId , 'likes.postId' : req.params.postId})
                    let data1 = await postModel.updateOne({_id : req.params.postId } , {$inc : { totalLikes : -1 }})
                    
                    res.status(200).json({
                        message : "success",
                        data : val ,
                        data1  : data1
                    })          
                }else{
                    let likedata = {
                        likes : {
                            userId : currentId , 
                            postId : req.params.postId,
                            updateDate : new Date()
                        }
                    }
                    let val = await actionModel.create(likedata)
                    let data1 = await postModel.updateOne({_id : req.params.postId } , {$inc : { totalLikes : 1 }})     
                    res.status(200).json({
                        message : "success",
                        data : val ,
                        data1  : data1
                    }) 
                }
                
        }catch(e){
            // res.status(500).json({
            //     message  : e.message
            // })
            console.log(e.message)
        }
        
       } ,
       
       async comments(req,res){
           try{
               let bodydata = req.body.commentMessage ;
               let commentdata = {
                    comment : {
                        date : new Date(),
                        userId : currentId ,
                        postId : req.params.postId ,
                        commentMessage : bodydata
                    }    
               }
               
               
               let data = await actionModel.create(commentdata) ;
               let data1 = await postModel.updateOne({_id : req.params.postId } , {$inc : { totalComment : 1 }}) 
              
               res.status(200).json({
                message : "success",
                data : data ,
                data1  : data1
            })

               
           }catch(e){
            res.status(500).json({
                message  : e
            })  
           }
       } ,

       async report(req,res){
            let reportdata = {
                report  : {
                    content : req.body.content ,
                    postId :  req.params.postId,
                    reportBy : currentId
                }
            }

            
            let count = await postModel.findOne({_id : req.params.postId }) ;
            
            if(count.report  > 5){
                await postModel.deleteOne({_id : req.params.postId})
            }else{
                let data = await actionModel.create(reportdata) ;
                await postModel.updateOne({_id : req.params.postId} , {$inc : { report : 1  } })
            }

       }


}
