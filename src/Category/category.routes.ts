import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "./category.controller";
import { isAdmin } from "../middleware/isAdmin";

const categoryRouter = Router();

categoryRouter.get("/list", getAllCategoriesController);
categoryRouter.post("/create", isAdmin, createCategoryController);
categoryRouter.patch("/update/:id", isAdmin, updateCategoryController);
categoryRouter.delete("/delete/:id", isAdmin, deleteCategoryController);

export default categoryRouter;
