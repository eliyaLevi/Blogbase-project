import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  profile: {
    bio?: string;
    socialLinks?: string[];
  };
  posts: Types.ObjectId[];
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
    },
    email: {
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
      type: String,
      enum: ["employee", "manager"],
      default: "employee",
    },
    salary: {
      type: Number,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    lastLogin: {
      type: Date,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "department",
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
UserSchema.index({ role: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ salary: 1 });


export default mongoose.model<IUser>("User", UserSchema);

