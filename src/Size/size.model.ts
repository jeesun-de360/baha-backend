import mongoose, { Document, Schema } from "mongoose";

export interface ISize extends Document {
  name: string;
  minAge: number;
  maxAge: number;
  description?: string;
  status: "active" | "inactive";
  priority?: number;
}

const SizeSchema = new Schema<ISize>(
  {
    name: {
      type: String,
      required: true,
    },
    minAge: {
      type: Number,
      required: true,
      unit: {
        type: String,
        enum: ['month', 'year'],
        default: 'month',
      },
    },
    maxAge: {
      type: Number,
      required: true,
      unit: {
        type: String,
        enum: ['month', 'year'],
        default: 'month',
      },
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Size = mongoose.model<ISize>("Size", SizeSchema);
