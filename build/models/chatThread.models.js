"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    members: [{ type: "ObjectId", unique: true, required: true }],
    lastMessage: { type: String, required: true },
    isSent: { type: "ObjectId", required: true }
});
exports.User = mongoose_1.model("chatThread", schema);
