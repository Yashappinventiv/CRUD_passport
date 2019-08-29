const fs = require('fs');

module.exports = {
     getdata(req,res){
        try{
            let content = fs.readFileSync('./data.json' , 'utf8');
             content = JSON.parse(content) ;
            let data = content.data            
            res.status(200).json({
                statusCode : 200 ,
                message : "succesful" ,
                data : data
            })
        }catch(e){
            res.status(500).json({
                statusCode : 500 ,
                message : "unsuccesful" ,
                data : null
            })
            console.log(e.message)
        }
        
        }
   ,     

    getdataByID(req,res){
     try{
        let id = req.param.id ;
        let content = fs.readFileSync('./data.json' , 'utf8');
        content = JSON.parse(content) ;
        let data = content.data
        let value =   data.find( (elem) => elem.id == id  )
        res.status(200).json({
            statusCode : 200 ,
            message : "succesful" ,
            data : value
        })
     }catch(e){
        res.status(500).json({
            statusCode : 500 ,
            message : "unsuccesful" ,
            data : null
        })
     }
       
      
   }
   ,

   postdata(req,res){
    try{
        let bodydata = req.body
        let content = fs.readFileSync('./data.json' , 'utf8');
        content = JSON.parse(content) ;
        let data = content.data ;
        data.push(bodydata);
        let value = { data : data }
        
        fs.writeFile('./data.json' , JSON.stringify(value) , (err , data) => {
            if(err){
                console.log(err.message)
            }
        })

        res.status(200).json({
            statusCode : 200 ,
            message : "succesful" ,
            data : value
        })

     }catch(e){
        res.status(500).json({
            statusCode : 500 ,
            message : "unsuccesful" ,
            data : null
        })   
     }
}
 ,

 putdata(req,res){
        try{
            let bodydata = req.body
            let content = fs.readFileSync('./data.json' , 'utf8');
            content = JSON.parse(content) ;
            let data = content.data ;

            data.forEach( (elem) => {
                if(elem.id == req.body.id){
                    console.log(req.body.id)
                    console.log(req.body);
                elem.name = req.body.name;
                elem.dept = req.body.dept;
                elem.mobile = req.body.mobile;
                elem.gender =  req.body.gender;
                
                return
                }
            } )

            let value = {data : data} ;
            value = JSON.stringify(value) ;

            fs.writeFileSync("./data.json" , value)

            res.status(200).json({
                   statusCode : 200 ,
                   message : "succesfully updated" ,
                   data  : value              
            })

        }catch(e){
                res.status(500).json({
                    statusCode : 500 ,
                    message : "Server error",
                    data : "put data api error"
                })
        }
 } ,

    deletedata(req,res){
        let id = req.params.id ;

        try{
            let content = fs.readFileSync('./data.json' , 'utf8');
            content = JSON.parse(content) ;
            let data = content.data ;

            data.forEach( (elem , index) => {
                if(elem.id == id){
                  data.splice(index , 1) ; 
                 return
                }
            } )

            console.log(data , id);

            let value = {data : data} ;
            value = JSON.stringify(value) ;

            fs.writeFileSync("./data.json" , value)

            res.status(200).json({
                   statusCode : 200 ,
                   message : "succesfully deleted" ,
                   data  : value              
            })

        }catch(e){
            res.status(500).json({
                statusCode : 500 ,
                message : "Server error",
                data : "put data api error"
            })
        }

    }

}



  