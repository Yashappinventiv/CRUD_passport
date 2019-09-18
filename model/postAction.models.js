const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    comment : {
        commentMessage : {type : String} ,
        date : {type  : Date } ,
        updateDate : {type : Date},
        likesBy : {type : Number},
       // reply : {type : Array} ,
        userId : {type : "ObjectId" },
        postId : {type : "ObjectId" }
    } 
    , 

    likes : {
        updateDate : {type : Date},
        userId : {type : "ObjectId" },  
        postId : {type : "ObjectId" }
    } ,

    report  : {
        content : {type : String} ,
        postId : {type : "ObjectId" },
        reportBy : {type : "ObjectId"}
    }
})


module.exports = mongoose.model('postaction' , schema)