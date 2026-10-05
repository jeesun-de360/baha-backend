import { Router } from "express";
import {
  createCouponController,
  deleteCouponController,
  getAllCouponsController,
  updateCouponController,
} from "./coupon.controller";
import { isAdmin } from "../middleware/isAdmin";

const couponRouter = Router();

couponRouter.get("/list", getAllCouponsController);
couponRouter.post("/create", isAdmin, createCouponController);
couponRouter.patch("/update/:id", isAdmin, updateCouponController);
couponRouter.delete("/delete/:id", isAdmin, deleteCouponController);

export default couponRouter;
