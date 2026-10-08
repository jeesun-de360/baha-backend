import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin";
import {
  getAllSettingsController,
  updateContactInfoController,
  updatePaymentInfoController,
  updatePrivacyPolicyController,
  updateReturnPolicyController,
  updateShippingPolicyController,
  updateSocialLinkController,
  updateTermsAndConditionsController,
} from "./settings.controller";

const settingsRouter = Router();

// Get settings
settingsRouter.get("/", getAllSettingsController);
settingsRouter.get("/all", getAllSettingsController);

// Update settings
settingsRouter.patch("/contact-info", isAdmin, updateContactInfoController);
settingsRouter.patch("/social-links", isAdmin, updateSocialLinkController);
settingsRouter.patch("/payment-info", isAdmin, updatePaymentInfoController);
settingsRouter.patch("/privacy-policy", isAdmin, updatePrivacyPolicyController);
settingsRouter.patch(
  "/terms-and-conditions",
  isAdmin,
  updateTermsAndConditionsController,
);
settingsRouter.patch(
  "/terms-conditions",
  isAdmin,
  updateTermsAndConditionsController,
);
settingsRouter.patch(
  "/shipping-policy",
  isAdmin,
  updateShippingPolicyController,
);
settingsRouter.patch("/return-policy", isAdmin, updateReturnPolicyController);

export default settingsRouter;
