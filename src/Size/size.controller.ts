import { Request, Response } from "express";
import {
  createSizeService,
  deleteSizeService,
  getAllSizesService,
  updateSizeService,
} from "./size.service";

// Create size controller function
export const createSizeController = async (req: Request, res: Response) => {
  try {
    const { name, minAge, maxAge, ageUnit, description, priority, status } = req.body;

    if (!name || minAge === undefined || minAge === null || !maxAge || !ageUnit) {
      return res
        .status(400)
        .json({ message: "Name, minAge, maxAge and ageUnit is required" });
    }

    const result = await createSizeService({
      name,
      minAge,
      maxAge,
      ageUnit,
      description,
      priority,
      status
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to create size" });
  }
};

// Update size controller function
export const updateSizeController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, minAge, maxAge, ageUnit, description, priority, status } = req.body;

    const result = await updateSizeService(id, {
      name,
      minAge,
      maxAge,
      ageUnit,
      description,
      priority,
      status
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update size" });
  }
};

// Get all size controller function
export const getAllSizesController = async (req: Request, res: Response) => {
  try {
    const { keyword = "", offset = 0, limit = 10, status = "" } = req.query;
    const sizes = await getAllSizesService(
      keyword as string,
      Number(offset),
      Number(limit),
      status as string,
    );
    return res.status(200).json(sizes);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to get all sizes" });
  }
};

// Delete size controller function
export const deleteSizeController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const result = await deleteSizeService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete size" });
  }
};
