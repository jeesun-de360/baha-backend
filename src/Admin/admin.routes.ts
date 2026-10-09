import { Router } from "express";
import {
  getAdminMyProfileController,
  loginAdminController,
  registerAdminController,
  resetPasswordController,
  updateProfileController,
} from "./admin.controller";
import { isAdmin } from "../middleware/isAdmin";

const adminRouter = Router();

adminRouter.post("/register", registerAdminController);
adminRouter.post("/login", loginAdminController);
adminRouter.get("/profile", isAdmin, getAdminMyProfileController);
adminRouter.patch("/update", isAdmin, updateProfileController);
adminRouter.patch("/reset-password", isAdmin, resetPasswordController);

export default adminRouter;
