const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seller = require('./view/seller_pro_route')
const user = require('./view/user_route')

try{
    mongoose.connect("mongodb://localhost:27017/task10")
}catch(e){
    console.log("error is" + e.message)
}


app.use(express.json())

app.use((req,res,next) => {

    if(!global.currentId){
        global.currentId = ""
    }
  
 next();
})

app.use("/seller" , seller);
app.use("/user" , user );

app.listen(3000 , () => {
    console.log("connected");
})