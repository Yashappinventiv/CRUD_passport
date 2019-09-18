const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const userRoutes  = require('./view/user.route');
const postRoutes = require('./view/post.routes');
const actionRoutes = require('./view/action.routes')

try{
    mongoose.set('debug', true)
    mongoose.connect("mongodb://localhost:27017/task11")
}catch(e){
    console.log(e.message)
}


app.use(express.json());

global.currentId = "" ;

app.use("/user" , userRoutes);
app.use("/post" , postRoutes) ;
app.use("/action" , actionRoutes);

app.listen( 3000 , () => {
    console.log("connected");
} )