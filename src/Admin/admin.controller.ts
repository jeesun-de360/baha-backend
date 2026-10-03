import { Request, Response } from "express";
import { registerAdminService } from "./admin.service";

// Register Admin controller function
export const registerAdminController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, email, password, phone, avatar, status } = req.body;

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
      avatar,
      status,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to register admin" });
  }
};
