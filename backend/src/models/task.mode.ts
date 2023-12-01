import mongoose, { Schema, Document, Model } from "mongoose";

export interface Task extends Document {
  title: string;
  description?: string;
  status?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema<Task> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "low",
      enum: ["low", "high"],
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const TaskModel: Model<Task> = mongoose.model<Task>("Task", taskSchema);

export default TaskModel;
