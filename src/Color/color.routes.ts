import { Router } from "express";
import {
  createColorController,
  deleteColorController,
  getAllColorsController,
  updateColorController,
} from "./color.controller";
import { isAdmin } from "../middleware/isAdmin";

const colorRouter = Router();

colorRouter.get("/list", getAllColorsController);
colorRouter.post("/create", isAdmin, createColorController);
colorRouter.patch("/update/:id", isAdmin, updateColorController);
colorRouter.delete("/delete/:id", isAdmin, deleteColorController);

export default colorRouter;
