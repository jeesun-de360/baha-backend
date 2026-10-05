import { Request, Response } from "express";
import {
  getAdminMyProfileService,
  loginAdminService,
  registerAdminService,
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

    const { token, ...result } = await loginAdminService(email, password);
    return res
      .cookie("bhtoken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      })
      .status(200)
      .json(result);
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
