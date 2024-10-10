import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  post: IPost["_id"]
}

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
  user: IUser["_id"]
}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comments: {
      type: String,
      default:[]
    },
  },
  { timestamps: true }
);


const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);


export default mongoose.model<IPost>("Post", PostSchema);
