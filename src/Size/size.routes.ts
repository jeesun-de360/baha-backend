import { Router } from "express";
import {
  createSizeController,
  deleteSizeController,
  getAllSizesController,
  updateSizeController,
} from "./size.controller";

const sizeRouter = Router();

sizeRouter.get("/list", getAllSizesController);
sizeRouter.post("/create", createSizeController);
sizeRouter.patch("/update/:id", updateSizeController);
sizeRouter.delete("/delete/:id", deleteSizeController);

export default sizeRouter;
