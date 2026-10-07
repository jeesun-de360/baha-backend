import mongoose, { Document, Schema } from "mongoose";

export interface IFAQ extends Document {
  question: string;
  answer: string;
  status: "active" | "inactive";
  order: number;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const FAQ = mongoose.model<IFAQ>("FAQ", FAQSchema);
