const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy ;
const fs = require('fs');

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

passport.use('local'  ,  new LocalStrategy(
    function(username, password, done) {
        
        let content = fs.readFileSync('./password.json' , 'utf8');
        content = JSON.parse(content);
        let data = content.data
        let found = false ;
        console.log(content)

        data.forEach( (elem) => {
            if(elem.email == username){
                found = true ;
            }
        } )
    
        if(found){
            return done(null , false)
        }
    
        const user = {
            email : username ,
            password : password
        }
    
        console.log(user);
    
        data.push(user);

        let  value = { data : data }
         value = JSON.stringify(value)

        try{
            fs.writeFileSync("./password.json", value, 'utf8');
        }catch(e){
                console.log("error message is" + e.message) ;
        }
    
        return done(null , user) ;
          
    }
  ));


passport.use('local-login' , new LocalStrategy(function(username , password , done){
    let content = fs.readFileSync('./password.json' , 'utf8');
    content = JSON.parse(content);
    let data = content.data
    let found = false ;
    let user

    data.forEach( (elem) => {
        if(elem.email == username && elem.password == password){
            found = true ;
            user = elem ;
        }
    } )

    if(found){
        return done(null , user )
    }else{
        return done(null , false)
    }


}))


module.exports = passport ;