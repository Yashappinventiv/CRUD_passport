import { Schema, Document, Model, model } from "mongoose";

interface message extends Document {
  chatId: "ObjectId";
  messgae: String;
  createdAt: Date;
  userSending: "ObjectId";
}

const schema = new Schema({
  chatId: { type: "ObjectId", unique: true, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  userSending: { type: "ObjectId", required: true }
});

export let User: Model<message> = model<message>("message", schema);