import { Router } from "express";
import {
  createHeroSliderController,
  deleteHeroSliderController,
  getAllHeroSlidersController,
  updateHeroSliderController,
} from "./heroSlider.controller";
import { isAdmin } from "../middleware/isAdmin";

const heroSliderRouter = Router();

heroSliderRouter.get("/list", getAllHeroSlidersController);
heroSliderRouter.post("/create", isAdmin, createHeroSliderController);
heroSliderRouter.patch("/update/:id", isAdmin, updateHeroSliderController);
heroSliderRouter.delete("/delete/:id", isAdmin, deleteHeroSliderController);

export default heroSliderRouter;
