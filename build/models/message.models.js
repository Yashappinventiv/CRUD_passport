"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    chatId: { type: "ObjectId", unique: true, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    userSending: { type: "ObjectId", required: true }
});
exports.User = mongoose_1.model("message", schema);
