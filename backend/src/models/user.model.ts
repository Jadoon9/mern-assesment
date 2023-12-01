import mongoose, { Schema, Model, Document } from "mongoose";

interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    username: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User: Model<UserDoc> = mongoose.model<UserDoc>("User", userSchema);

export default User;
