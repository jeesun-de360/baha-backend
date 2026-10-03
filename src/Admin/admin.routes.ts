import { Router } from "express";
import { registerAdminController } from "./admin.controller";

const adminRouter = Router();

adminRouter.post("/register", registerAdminController);

export default adminRouter;
