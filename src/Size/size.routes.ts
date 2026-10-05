import { Router } from "express";
import {
  createSizeController,
  deleteSizeController,
  getAllSizesController,
  updateSizeController,
} from "./size.controller";
import { isAdmin } from "../middleware/isAdmin";

const sizeRouter = Router();

sizeRouter.get("/list", getAllSizesController);
sizeRouter.post("/create", isAdmin, createSizeController);
sizeRouter.patch("/update/:id", isAdmin, updateSizeController);
sizeRouter.delete("/delete/:id", isAdmin, deleteSizeController);

export default sizeRouter;
