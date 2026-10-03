import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  customerName: string;
  customerRole?: string;
  rating: number;
  status: "active" | "inactive";
  avatar?: string;
  review: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerRole: {
      type: String,
      default: "Verified Buyer",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    avatar: {
      type: String,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  TestimonialSchema,
);
