import { Router } from "express";
import { createCategoryController } from "./category.controller";


const categoryRouter = Router();

categoryRouter.post("/create", createCategoryController);

export default categoryRouter;
