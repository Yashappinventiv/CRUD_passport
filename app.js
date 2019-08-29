const express = require('express');
const app = express() ;
const route = require('./routes');
const session = require('express-session')

const passport = require("passport");



app.use(session({
    secret: 'node task6',
    resave: false,
    saveUninitialized: true,
  }))

app.use(express.json()) ;
app.use(passport.initialize());
app.use(passport.session());
app.use(route);


app.listen(3000 ,  () => {
    console.log("connected");
})