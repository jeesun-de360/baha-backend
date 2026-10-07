import mongoose, { Document, Schema } from "mongoose";

export interface ISize extends Document {
  name: string;
  minAge: number;
  maxAge: number;
  ageUnit: "month" | "year";
  description?: string;
  status: "active" | "inactive" | "deleted";
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
    },
    maxAge: {
      type: Number,
      required: true,
    },
    ageUnit: {
      type: String,
      enum: ['month', 'year'] as const,
      default: 'month',
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"] as const,
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
