import { Router } from "express";
import {
  createFAQController,
  deleteFAQController,
  getAllFAQsController,
  updateFAQController,
} from "./faq.controller";

const faqRouter = Router();

faqRouter.get("/list", getAllFAQsController);
faqRouter.post("/create", createFAQController);
faqRouter.patch("/update/:id", updateFAQController);
faqRouter.delete("/delete/:id", deleteFAQController);

export default faqRouter;
