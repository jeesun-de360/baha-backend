import { Router } from "express";
import { getAdminMyProfileController, loginAdminController, registerAdminController } from "./admin.controller";
import { isAdmin } from "../middleware/isAdmin";

const adminRouter = Router();

adminRouter.post("/register", registerAdminController);
adminRouter.post("/login", loginAdminController);
adminRouter.get("/me", isAdmin, getAdminMyProfileController)

export default adminRouter;
