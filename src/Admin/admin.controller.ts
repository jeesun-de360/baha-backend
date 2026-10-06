import { Request, Response } from "express";
import {
  getAdminMyProfileService,
  loginAdminService,
  registerAdminService,
  resetPasswordService,
  updateProfileService,
} from "./admin.service";
import { AdminRequest } from "../middleware/isAdmin";

// Register Admin controller function
export const registerAdminController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    const result = await registerAdminService({
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to register admin" });
  }
};

// Login Admin controller function
export const loginAdminController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Enter all the fields" });
    }

    const result = await loginAdminService(email, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to login admin" });
  }
};

// Get Admin my profile controller function
export const getAdminMyProfileController = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    const adminId = req.adminId!;
    const result = await getAdminMyProfileService(adminId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to get admin profile" });
  }
};

// Update profile controller function
export const updateProfileController = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    const adminId = req.adminId!;
    const { name } = req.body;

    const result = await updateProfileService(adminId, {
      name
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update profile" });
  }
};

// Reset password controller function
export const resetPasswordController = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    const adminId = req.adminId!;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Old password and new password are required",
      });
    }

    const result = await resetPasswordService(adminId, {
      oldPassword,
      newPassword,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to reset password" });
  }
};
