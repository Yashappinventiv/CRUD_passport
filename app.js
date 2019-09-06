const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user_routes = require('./routes/user_routes')

try{
    mongoose.connect('mongodb://localhost:27017/task9')
}catch(e){
    resizeBy.status(500).json({
        message : "unsuccesful" ,
        error : e.message
    })
}

app.use(express.json());
app.use(user_routes);

app.listen(3000 , () => {
    console.log("connected");
})