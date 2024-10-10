import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IPost } from "./postModel";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
  comparePassword(userPassword: string): Promise<boolean>;
}


const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "המייל לא תקין"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    profile: {
        bio:{
          type: String,
          default: ''
        },
        socialLinks: {
          type: [String],
          validate: [validator.isURL, "הלינק לא תקין"],
          default:[]
        },
    },
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "posts",
    },
  },
  { timestamps: true }
);

// אחראית על הצפנת הסיסמה
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  
  next();
});

// השוואה בין הסיסמה שהמשתמש הזין לעומת ההצפנה
UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

// מגדיר מאפיין ספציפי בסכסמה כאינדקס
UserSchema.index({ username: 1 });
UserSchema.index({ posts: 1 });



export default mongoose.model<IUser>("User", UserSchema);

