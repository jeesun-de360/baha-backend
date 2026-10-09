import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin";
import {
  getAllSettingsController,
  updateContactInfoController,
  updatePaymentInfoController,
  updatePrivacyPolicyController,
  updateReturnPolicyController,
  updateSettingsController,
  updateShippingPolicyController,
  updateSocialLinkController,
  updateTermsAndConditionsController,
} from "./settings.controller";

const settingsRouter = Router();

// Get settings
settingsRouter.get("/all", getAllSettingsController);

// Update settings
settingsRouter.patch("/add", isAdmin, updateSettingsController);

export default settingsRouter;
