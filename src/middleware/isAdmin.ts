import { Request, Response, NextFunction } from "express";
import { verifyJWTToken } from "../utils/jwtToken";

export interface AdminRequest extends Request {
  adminId?: string;
}

export const isAdmin = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.cookies.bhtoken || req.header("Authorization")?.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  try {
    const decodedToken = verifyJWTToken(token);
    if (decodedToken.type !== "admin" && decodedToken.type !== "staff") {
      return res.status(401).json({ message: "Access denied" });
    }

    req.adminId = decodedToken._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
