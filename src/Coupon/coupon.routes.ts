import { Router } from "express";
import {
  createCouponController,
  deleteCouponController,
  getAllCouponsController,
  updateCouponController,
} from "./coupon.controller";

const couponRouter = Router();

couponRouter.get("/list", getAllCouponsController);
couponRouter.post("/create", createCouponController);
couponRouter.patch("/update/:id", updateCouponController);
couponRouter.delete("/delete/:id", deleteCouponController);

export default couponRouter;
