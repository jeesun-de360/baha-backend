import { Request, Response } from "express";
import {
  createFAQService,
  deleteFAQService,
  getAllFAQsService,
  updateFAQService,
} from "./faq.service";

// Create FAQ controller function
export const createFAQController = async (req: Request, res: Response) => {
  try {
    const { category, question, answer, status, order } = req.body;

    if (!category || !question || !answer) {
      return res.status(400).json({
        message: "Category, question, and answer are required",
      });
    }

    const result = await createFAQService({
      category,
      question,
      answer,
      status,
      order,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to create FAQ" });
  }
};

// Update FAQ controller function
export const updateFAQController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { category, question, answer, status, order } = req.body;

    const result = await updateFAQService(id, {
      category,
      question,
      answer,
      status,
      order,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to update FAQ" });
  }
};

// Get all FAQs controller function
export const getAllFAQsController = async (req: Request, res: Response) => {
  try {
    const { search = "", limit = 10, offset = 0, status, category } = req.query;
    const result = await getAllFAQsService(
      search as string,
      Number(limit),
      Number(offset),
      status as string,
      category as string,
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to get all FAQs" });
  }
};

// Delete FAQ controller function
export const deleteFAQController = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const result = await deleteFAQService(id);
    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to delete FAQ" });
  }
};
