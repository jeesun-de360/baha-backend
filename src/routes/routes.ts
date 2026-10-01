import { Router } from 'express';
import colorRouter from '../Color/color.routes';
import sizeRouter from '../Size/size.routes';
import categoryRouter from '../Category/category.routes';


const routes = Router();

// Color routes
routes.use('/color', colorRouter);
routes.use("/size", sizeRouter);
routes.use("/category", categoryRouter)

export default routes;
