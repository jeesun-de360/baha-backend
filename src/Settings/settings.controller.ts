import { Request, Response } from "express";
import {
  getAllSettingsService,
  updateContactInfoService,
  updatePaymentInfoService,
  updatePrivacyPolicyService,
  updateReturnPolicyService,
  updateShippingPolicyService,
  updateSocialLinkService,
  updateTermsAndConditionsService,
} from "./settings.service";

// Update contact info controller function
export const updateContactInfoController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, phone, whatsapp, address } = req.body;
    const result = await updateContactInfoService({
      email,
      phone,
      whatsapp,
      address,
    });
    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to add contact info" });
  }
};

// Update social links controller function
export const updateSocialLinkController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { facebook, twitter, instagram, linkedin, youtube } = req.body;
    const result = await updateSocialLinkService({
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
    });
    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to add social links" });
  }
};

// Update payment info controller function
export const updatePaymentInfoController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      prepaidDeliveryFee,
      freePrepaidDeliveryOn,
      codDeliveryFee,
      freeCodDeliveryOn,
      maxFreeCodDeliveryOn,
    } = req.body;
    const result = await updatePaymentInfoService({
      prepaidDeliveryFee,
      freePrepaidDeliveryOn,
      codDeliveryFee,
      freeCodDeliveryOn,
      maxFreeCodDeliveryOn,
    });
    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to add payment info" });
  }
};

// Update privacy policy controller function
export const updatePrivacyPolicyController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { privacyPolicy } = req.body;
    const result = await updatePrivacyPolicyService(privacyPolicy);
    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update privacy policy" });
  }
};

// Update terms and conditions controller function
export const updateTermsAndConditionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { termsConditions } = req.body;
    const result = await updateTermsAndConditionsService(termsConditions ?? "");
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to update terms and conditions",
    });
  }
};

// Update shipping policy controller function
export const updateShippingPolicyController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { shippingPolicy } = req.body;
    const result = await updateShippingPolicyService(shippingPolicy);
    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update shipping policy" });
  }
};

// Update return policy controller function
export const updateReturnPolicyController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { returnPolicy } = req.body;
    const result = await updateReturnPolicyService(returnPolicy);
    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update return policy" });
  }
};

// Get all settings controller function
export const getAllSettingsController = async (req: Request, res: Response) => {
  try {
    const result = await getAllSettingsService();
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to get settings" });
  }
};
