import { Router } from "express";
import {
  createTestimonialController,
  deleteTestimonialController,
  getAllTestimonialsController,
  updateTestimonialController,
} from "./testimonial.controller";

const testimonialRouter = Router();

testimonialRouter.get("/list", getAllTestimonialsController);
testimonialRouter.post("/create", createTestimonialController);
testimonialRouter.patch("/update/:id", updateTestimonialController);
testimonialRouter.delete("/delete/:id", deleteTestimonialController);

export default testimonialRouter;
