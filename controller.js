const usermodel = require('./models/user');
const jwt = require('jsonwebtoken')

module.exports = {

    async signup(req, res) {
        try {
            let bodydata = req.body;
            let data = await usermodel.create(bodydata);
            res.status(200).json({
                message: "success",
                data: data
            })
        } catch (e) {
            res.status(500).json({
                message: "unsuccesful",
                data: null,
                error: e.message
            })
        }


    },

    async login(req, res) {
        try {
            let bodydata = req.body;
            let count = await usermodel.find({ email: bodydata.email, password: bodydata.password }).count();
            if (count == 0) {
                res.status(400).json({
                    message: "unsuccesful",
                    error: "already exits"
                })
            } else {
                let tokken = jwt.sign(bodydata, "secretkey");
                res.status(200).json({
                    status: "user exits",
                    tokken: tokken
                })
            }
        } catch (e) {
            res.status(400).json({
                message: "unsuccesful",
                error: e.message
            })
        }
    },

    async getdata(req, res) {
        try {
            let check = req.query;
            let filter = {}
            if (check.id) {
                filter._id = check.id
            }
            if (check.username) {
                filter.username = check.username
            }

            let data = await usermodel.aggregate([
                { $match: filter },
                { $addFields: {age: {
                    $divide: [{ $subtract: [new Date(), "$dob"] },
                    (365 * 24 * 60 * 60 * 1000)]
                }  }},
        { $project: { _id: 0, username : 1, age : 1 } }
            ])

        res.status(200).json({
            message: "success",
            data: data
        })

    }catch(e) {
        res.status(400).json({
            message: "unsuccesful",
            error: e.message
        })
    }
},

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
            console.log(bearerToken);
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

}
}