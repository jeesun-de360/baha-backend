import { Router } from "express";
import {
  createColorController,
  deleteColorController,
  getAllColorsController,
  updateColorController,
} from "./color.controller";

const colorRouter = Router();

colorRouter.get("/list", getAllColorsController);
colorRouter.post("/create", createColorController);
colorRouter.patch("/update/:id", updateColorController);
colorRouter.delete("/delete/:id", deleteColorController);

export default colorRouter;
