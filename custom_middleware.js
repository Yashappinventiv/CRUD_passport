const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    signup(req, res) {
        
        let username = req.body.username;
        let password = req.body.password ;
        
        let user_id = req.body.id ;
    
        let found = false;
        try {
            let signdata = fs.readFileSync('./logindata.json', 'utf8');
            signdata = JSON.parse(signdata);

            signdata.forEach((elem) => {
                if (elem.username == username) {
                    found = true;
                    return
                }
            })

            if (found) {
                res.status(400).json({
                    message : "email cannot be same" ,
                     })
            }else{
                const salt = bcrypt.genSaltSync(10);
                const hash_password = bcrypt.hashSync(password, salt);
    
                signdata.push({ username: username, password: hash_password , id : user_id })
    
                let value = JSON.stringify(signdata);
                fs.writeFileSync('./logindata.json', value);
    
                let user = {
                    username : username  
                   }

                let tokken = jwt.sign({ user: user }, 'secretkey');
                let content = fs.readFileSync('./tokken.json', 'utf8');
                content = JSON.parse(content);
                content.push({ time: new Date(), tokken: tokken , user_id : user_id });
                let val_token = JSON.stringify(content)
                fs.writeFileSync('./tokken.json', val_token);
    
                 res.status(200).json({
                    message: "tokken generated",
                    token: tokken
                })
            }

           

        } catch (e) {
            res.status(500).json({
                message: "server error from signup",
                error: e.message
            })
        }


    }
    ,

    verifyToken(req, res, next) {
        
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            console.log(bearerHeader)
            const bearer = bearerHeader.split(' ');
            // Get token from array
            console.log(bearer)
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            try {
                console.log( bearerToken);
                var decoded = jwt.verify(bearerToken, 'secretkey');
                console.log(decoded);
                if (typeof decoded !== 'undefined') {
                    next();
                } else {
                    res.sendStatus(403);
                }
            } catch (e) {
                res.status(500).json({
                    message: e.message
                })
            }


        } else {
            // Forbidden
            res.sendStatus(403);
        }

    },

    login(req,res) {
        let username = req.body.username;
        let password = req.body.password ;
        let user = {
            username  : username
        }

        try{
            let logindata = fs.readFileSync('./logindata.json', 'utf8');
            logindata = JSON.parse(logindata);
            let found = false ;
            
            console.log(logindata)

            logindata.forEach( (elem) => {
                    if(elem.username == username){
                        let pass = bcrypt.compareSync(password, elem.password) ;
                        if(pass){
                            found = true ;
                            let tokken = jwt.sign({ user: user }, 'secretkey');
                            console.log(tokken);
                            let content = fs.readFileSync('./tokken.json', 'utf8');
                            content = JSON.parse(content);
                            console.log(content)
                            content.push({ time: new Date(), tokken: tokken , user_id : elem.id });
                            user_store_id = elem.id ;
                            let val_token = JSON.stringify(content)
                            fs.writeFileSync('./tokken.json', val_token);
                
                             res.status(200).json({
                                message: "tokken generated",
                                token: tokken
                            })                     
                        }
                    }
            } )
    
    
            if(!found){
                res.status(400).json({
                    message : "you need to signup first"
                })
            }
        }
        catch(e){
            res.status(500).json({
                message : "unsuccessful" ,
                error : e.message
            })
        }

        

    }



}