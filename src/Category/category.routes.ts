import { Router } from "express";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, updateCategoryController } from "./category.controller";


const categoryRouter = Router();

categoryRouter.get("/list", getAllCategoriesController);
categoryRouter.post("/create", createCategoryController);
categoryRouter.patch("/update/:id", updateCategoryController);
categoryRouter.delete("/delete/:id", deleteCategoryController);

export default categoryRouter;
