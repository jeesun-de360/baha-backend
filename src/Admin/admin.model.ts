import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: string;
  type: 'admin' | 'staff';
  status: 'pending' | 'active' | 'deleted';
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
      default: '',
    },
    type: {
      type: String,
      enum: ['admin', 'staff'] as const,
      default: 'staff',
    },
    status: {
      type: String,
      enum: ["pending", "active", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
