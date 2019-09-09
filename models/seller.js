const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    salesId  : {type  : "ObjectId", required : true },
    clothesId : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          }
    ]  ,
    shoesId : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ] 
})

module.exports = mongoose.model('seller' , schema)