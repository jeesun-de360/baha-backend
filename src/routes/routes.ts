import { Router } from 'express';
import colorRouter from '../Color/color.routes';
import sizeRouter from '../Size/size.routes';
import categoryRouter from '../Category/category.routes';
import heroSliderRouter from '../HeroSlider/heroSlider.routes';
import couponRouter from '../Coupon/coupon.routes';
import testimonialRouter from '../Testimonial/testimonial.routes';
import faqRouter from '../FAQ/faq.routes';
import adminRouter from '../Admin/admin.routes';


const routes = Router();

// Admin routes
routes.use("/admin", adminRouter);

// Color routes
routes.use('/color', colorRouter);

// Size routes
routes.use("/size", sizeRouter);

// Category routes
routes.use("/category", categoryRouter)

// Hero slider routes
routes.use("/hero-slider", heroSliderRouter);

// Coupon routes
routes.use("/coupon", couponRouter);

// Testimonial routes
routes.use("/testimonial", testimonialRouter);

// FAQ routes
routes.use("/faq", faqRouter);

export default routes;
