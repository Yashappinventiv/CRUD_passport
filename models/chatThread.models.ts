import { Schema, Document, Model, model } from "mongoose";
import { ObjectID } from "bson";

interface chatThread extends Document {
  members: { id: "ObjectId" }[];
  lastMessage: "string";
  isSent: "ObjectId";
}

const schema = new Schema({
  members: [{ type: "ObjectId", unique: true, required: true }],
  lastMessage: { type: String, required: true },
  isSent: { type: "ObjectId", required: true }
});

export let User: Model<chatThread> = model<chatThread>("chatThread", schema);



