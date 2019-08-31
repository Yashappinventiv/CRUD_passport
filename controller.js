const fs = require('fs');


module.exports = {
    poststud_data(req, res) {
        try {
            let bodydata = req.body
            bodydata.user_id = user_store_id ;
            let content = fs.readFileSync('./data.json', 'utf8')
            content = JSON.parse(content);
            let stud_data = content.student;
            stud_data.push(bodydata);

            let value = JSON.stringify(content);
            console.log(value);

            fs.writeFileSync('./data.json', value);
            res.status(200).json({
                message: "succesful",
                data: stud_data
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }

    },


    post_sub(req, res) {

        try {
            let bodydata = req.body.subjectId;
            let query = req.query.name;
            let content = fs.readFileSync('./data.json', 'utf8')
            content = JSON.parse(content);
            let stud_data = content.student;
            stud_data.forEach((elem) => {
                if (elem.name == query) {
                    elem.subject_attended.push(bodydata);
                    return
                }
            })

            let value = JSON.stringify(content);

            fs.writeFileSync('./data.json', value);

            res.status(200).json({
                message: "succesfull",
                data: value
            })

        } catch (e) {
            res.status(500).json({
                message: "server error"
            })
        }

    },

    getdata(req,res) {

        try{
            let content = fs.readFileSync('./data.json', 'utf8')
            content = JSON.parse(content);
            let stud_data = content.student;
            let data = []
            stud_data.forEach( (elem) => {
                   data.push({name : elem.name , subject : elem.subject_attended }) 
            } )
    
            res.status(200).json({
                message: "succesfull",
                data: data
            })
    
        }
        catch(e){
            res.status(500).json({
                message: "server error"
            })
        }
       
    }

}