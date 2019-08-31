const express = require('express');
const app = express();
const routers = require('./routes');

app.use(express.json()) ;

app.use( (req,res , next) => {
    if(req.body.id){
        global.user_store_id = req.body.id ;
    }
   
    next();
} )

app.use(routers);

app.listen(3000 , () => {
    console.log("connected");
})