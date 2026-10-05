import { Router } from "express";
import {
  createFAQController,
  deleteFAQController,
  getAllFAQsController,
  updateFAQController,
} from "./faq.controller";
import { isAdmin } from "../middleware/isAdmin";

const faqRouter = Router();

faqRouter.get("/list", getAllFAQsController);
faqRouter.post("/create", isAdmin, createFAQController);
faqRouter.patch("/update/:id", isAdmin, updateFAQController);
faqRouter.delete("/delete/:id", isAdmin, deleteFAQController);

export default faqRouter;
