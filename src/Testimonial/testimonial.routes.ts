import { Router } from "express";
import {
  createTestimonialController,
  deleteTestimonialController,
  getAllTestimonialsController,
  updateTestimonialController,
} from "./testimonial.controller";
import { isAdmin } from "../middleware/isAdmin";

const testimonialRouter = Router();

testimonialRouter.get("/list", getAllTestimonialsController);
testimonialRouter.post("/create", isAdmin, createTestimonialController);
testimonialRouter.patch("/update/:id", isAdmin, updateTestimonialController);
testimonialRouter.delete("/delete/:id", isAdmin, deleteTestimonialController);

export default testimonialRouter;
