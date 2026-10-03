import { Router } from "express";
import { createHeroSliderController, deleteHeroSliderController, getAllHeroSlidersController, updateHeroSliderController } from "./heroSlider.controller";


const heroSliderRouter = Router();

heroSliderRouter.get('/list', getAllHeroSlidersController);
heroSliderRouter.post('/create', createHeroSliderController);
heroSliderRouter.patch('/update/:id', updateHeroSliderController);
heroSliderRouter.delete('/delete/:id', deleteHeroSliderController);

export default heroSliderRouter;
