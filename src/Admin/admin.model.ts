import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: "admin";
  avatar?: string;
  status: "active" | "inactive";
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
