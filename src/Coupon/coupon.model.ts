import mongoose, { Document, Schema } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "fixed" | "free-shipping";
  discountValue: number;
  minOrderSpend: number;
  maxCapDiscount?: number;
  totalUsageLimit?: number;
  limitPerCustomer: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "inactive";
  description?: string;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed", "free-shipping"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderSpend: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxCapDiscount: {
      type: Number,
      default: null,
    },
    totalUsageLimit: {
      type: Number,
      default: null,
    },
    limitPerCustomer: {
      type: Number,
      default: 1,
      min: 1,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema);
