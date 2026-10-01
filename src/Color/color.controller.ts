import { Request, Response } from "express";
import {
  createColorService,
  deleteColorService,
  getAllColorsService,
  updateColorService,
} from "./color.service";

// Create color controller function
export const createColorController = async (req: Request, res: Response) => {
  try {
    const { name, slug, status, hexCode, priority } = req.body;

    if (!name || !hexCode || !slug) {
      return res
        .status(400)
        .json({ message: "Name, hexCode, and slug are required" });
    }

    const result = await createColorService({
      name,
      slug,
      status,
      hexCode,
      priority,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to create color" });
  }
};

// Update color controller function
export const updateColorController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, slug, hexCode, priority } = req.body;

    const result = await updateColorService(id, {
      name,
      slug,
      hexCode,
      priority,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update color" });
  }
};

// Get all colors controller function
export const getAllColorsController = async (req: Request, res: Response) => {
  try {
    const { query, sort } = req.query;
    const colors = await getAllColorsService({
      query: query as string,
      sort: sort as "asc" | "desc",
    });
    return res.status(200).json(colors);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to get all colors" });
  }
};

// Delete color controller function
export const deleteColorController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const result = await deleteColorService(id);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete color" });
  }
};
