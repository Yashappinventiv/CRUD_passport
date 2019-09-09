const adminAccess = require('../models/adminaccess');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const productModel = require('../models/products');
const sellModel = require('../models/seller')

module.exports = {
    async getAccess(req, res) {
        try {
            let { email, password } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hash_password = bcrypt.hashSync(password, salt);
            let data = await adminAccess.create({ email: email, password: hash_password });
            let value = await sellModel.create({ salesId: data._id });

            res.status(200).json({
                message: "success",
                data: data,
                value: value
            })
        } catch (e) {
            res.status(500).json({
                message: "server error",
                error: e.message
            })
        }
    },

    async loginseller(req, res) {
        try {
            let { email, password } = req.body;
            let user_exits = await adminAccess.find({ email: email })
            console.log(user_exits)
            if (user_exits.length > 0) {
                let pass = bcrypt.compareSync(password, user_exits[0].password);
                if (pass) {
                    let tokken = jwt.sign({ id: user_exits._id, email: email }, "secretkeySeller");
                    currentId = user_exits[0]._id;
                    console.log(user_exits[0]._id)

                    res.status(200).json({
                        message: "succesful",
                        tokken: tokken
                    })

                } else {
                    res.status(400).json({
                        message: "password is invalid"
                    })
                }
            } else {
                res.status(400).json({
                    message: "email doesnot exits"
                })
            }
        } catch (e) {
            res.status(500).json({
                message: "server error",
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
                var decoded = jwt.verify(bearerToken, 'secretkeySeller');
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

    async addproduct(req, res) {
        let bodydata = req.body;
        bodydata.sellerId = currentId

        let proddata = await productModel.create(bodydata);
        if (proddata.type == 'clothing') {
            let sellerIfor = await sellModel.updateOne({ salesId: currentId }, { $push: { clothesId: proddata } });
            console.log(sellerIfor);
            res.status(200).json({
                message: "product created",
                proddata: proddata,
                sellerIfor: sellerIfor
            })
        } else {
            let sellerIfor = await sellModel.updateOne({ salesId: currentId }, { $push: { shoesId: proddata } });
            res.status(200).json({
                message: "product created",
                proddata: proddata,
                sellerIfor: sellerIfor
            })
        }

    }

    ,

    async updateProduct(req, res) {
        let updateId = req.params.id;

        let datas = await productModel.findById(updateId);
        
        if (datas.sellerId.toString() === currentId.toString()) {
            console.log("working")
            let updatepr = await productModel.updateOne({ _id: updateId }, req.body);
            res.status(200).json({
                message: "successful",
                data: updatepr
            })
        } else {
            res.status(400).json({
                message: "permission denied",
                erorr: "you canot update this product"
            })
        }
    },

    async deleteProduct(req, res) {
        let updateId = req.params.id;
        let data = await productModel.findOne({ _id: updateId })

        if (data.sellerId.toString() == currentId.toString()) {
            let deletepro = await productModel.deleteOne({ _id: updateId });
            res.status(200).json({
                message: "successful",
                data: deletepro
            })
        } else {
            res.status(400).json({
                message: "permission denied",
                erorr: "you canot update this product"
            })
        }
    }

}