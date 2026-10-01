import { Router } from 'express';
import colorRouter from '../Color/color.routes';


const routes = Router();

// Color routes
routes.use('/color', colorRouter);

export default routes;
