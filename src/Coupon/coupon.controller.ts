import { Request, Response } from "express";
import {
  createCouponService,
  deleteCouponService,
  getAllCouponsService,
  updateCouponService,
} from "./coupon.service";

// Create coupon controller function
export const createCouponController = async (req: Request, res: Response) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderSpend,
      maxCapDiscount,
      totalUsageLimit,
      limitPerCustomer,
      startDate,
      endDate,
      status,
      description,
    } = req.body;

    if (!code || !discountType || !discountValue || !startDate || !endDate) {
      return res.status(400).json({
        message:
          "Code, discountType, discountValue, startDate and endDate are required",
      });
    }

    const result = await createCouponService({
      code,
      discountType,
      discountValue,
      minOrderSpend,
      maxCapDiscount,
      totalUsageLimit,
      limitPerCustomer,
      startDate,
      endDate,
      status,
      description,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to create coupon" });
  }
};

// Update coupon controller function
export const updateCouponController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const {
      code,
      discountType,
      discountValue,
      minOrderSpend,
      maxCapDiscount,
      totalUsageLimit,
      limitPerCustomer,
      startDate,
      endDate,
      status,
      description,
    } = req.body;

    const result = await updateCouponService(id, {
      code,
      discountType,
      discountValue,
      minOrderSpend,
      maxCapDiscount,
      totalUsageLimit,
      limitPerCustomer,
      startDate,
      endDate,
      status,
      description,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update coupon" });
  }
};

// Get all coupons controller function
export const getAllCouponsController = async (req: Request, res: Response) => {
  try {
    const { keyword = "", limit = 10, offset = 0, status } = req.query;
    const result = await getAllCouponsService(
      keyword as string,
      Number(limit),
      Number(offset),
      status as string,
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to get all coupons" });
  }
};

// Delete coupon controller function
export const deleteCouponController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const result = await deleteCouponService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete coupon" });
  }
};
