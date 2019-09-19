const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userModel = require('../model/user.models')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const postModel = require('../model/post.models')

module.exports = {
    async signup(req, res) {
        try {
            let { password } = req.body;
            let bodydata = req.body
            const salt = bcrypt.genSaltSync(10);
            const hash_password = bcrypt.hashSync(password, salt);
            bodydata.password = hash_password
            let data = await userModel.create(bodydata);


            res.status(200).json({
                message: "success",
                data: data
            })
        } catch (e) {
            res.status(500).json({
                message: "server error",
                error: e.message
            })
        }
    }
    ,

    async loginuser(req, res) {
        try {
            let { email, password } = req.body;
            console.log(email)
            let user_exits = await userModel.findOne({ email: email })
            console.log(user_exits)
            if (user_exits) {
                let pass = bcrypt.compareSync(password, user_exits.password);
                if (pass) {
                    let tokken = jwt.sign({ id: user_exits._id, email: email }, "secretkeyUser");
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
        console.log(bearerHeader)
        if (typeof bearerHeader !== 'undefined') {
            console.log(bearerHeader)
            const bearer = bearerHeader.split(' ');
            console.log(bearer)
            const bearerToken = bearer[1];
            try {
                console.log(bearerToken);
                var decoded = jwt.verify(bearerToken, 'secretkeyUser');
                console.log(decoded);
                if (typeof decoded !== 'undefined') {
                    currentId = decoded.id
                    res.locals.userId = currentId
                    console.log("1", currentId);
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

    async viewDetails(req, res) {
        console.log(".....", res.locals.userId)
        let data = await userModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(res.locals.userId) } },
            { $lookup: { from: "posts", localField: "_id", foreignField: "userId", as: "total" } },
            { $unwind: "$total" },
            {
                $lookup: {
                    from: "postactions", let: { userId: "$_id", postId: "$total._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ["$likes.userId", "$$userId"] },
                                    { $eq: ["$likes.postId", "$$postId"] }]
                                }
                            }
                        },

                    ], as: "isActive"
                }
            },

            { $project: { isLiked: { $cond: { if: { $gt: [{ $size: "$isActive" }, 0] }, then: "true", else: "false" } }, _id: 1, total: 1 } },
            { $group: { _id: "$total.type", data: { $push: "$$ROOT" } } }

        ])
        console.log(data);
        res.send(data);
    }
    ,

    async individualType(req, res) {

        let data = await postModel.aggregate([
            { $match: { type: +req.params.type } },
            {
                $lookup: {
                    from: "postactions", let: { postid: "$_id", postdata: "$$ROOT" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$likes.userId", mongoose.Types.ObjectId(currentId)] },
                                        { $eq: ["$likes.postId", "$$postid"] }]
                                }
                            }
                        },

                    ],
                    as: "like"
                }
            }
            ,
            {
                $project: {
                    isLiked: { $cond: { if: { $gt: [{ $size: "$like" }, 0] }, then: "true", else: "false" } },
                    _id: 1, userId: 1, totalLikes: 1, totalComment: 1, title: 1
                }
            }

        ])

        res.status(200).json({
            data: data
        })
    }

    ,

    async typebase(req, res) {
        console.log(currentId)
        let user = userModel.aggregate([{ $match: { _id: mongoose.Types.ObjectId(currentId) } }])
        let image = postModel.aggregate([{ $match: { userId: mongoose.Types.ObjectId(currentId), type: 1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "postactions", let: { postid: "$_id" }, pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [{ $eq: ["$$postid", "$likes.postId"] },
                                { $eq: [mongoose.Types.ObjectId(currentId), "$likes.userId"] }]
                            }
                        }
                    }
                ], as: "isActive"
            }
        }
            ,

        {
            $project: {
                isLiked: { $cond: { if: { $gt: [{ $size: "$isActive" }, 0] }, then: "true", else: "false" } }, totalLikes: 1,
                totalComment: 1, type: 1, title: 1, link: 1, userId: 1
            }
        }


        ])


        let video = postModel.aggregate([{ $match: { userId: mongoose.Types.ObjectId(currentId), type: 2 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "postactions", let: { postid: "$_id" }, pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [{ $eq: ["$$postid", "$likes.postId"] },
                                { $eq: [mongoose.Types.ObjectId(currentId), "$likes.userId"] }]
                            }
                        }
                    }
                ], as: "isActive"
            }
        }
            ,

        {
            $project: {
                isLiked: { $cond: { if: { $gt: [{ $size: "$isActive" }, 0] }, then: "true", else: "false" } }, totalLikes: 1,
                totalComment: 1, type: 1, title: 1, link: 1, userId: 1
            }
        }


        ])

        let valuesAll = await Promise.all([user , image , video]) ;
        
        res.status(200).json({
             userDetails : valuesAll[0],
             ImageDetails : valuesAll[1],
             videoDetails : valuesAll[2]   
        })
        

    }


}
















