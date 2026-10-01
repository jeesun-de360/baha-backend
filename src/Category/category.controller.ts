import { Request, Response } from "express";
import { createCategoryService, updateCategoryService } from "./category.service";

// Create Category controller function
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      image,
      metaTitle,
      metaDescription,
      status,
      priority,
    } = req.body;

    if (!name || !image || !metaTitle || !metaDescription) {
      return res.status(400).json({
        message: "Name, image, metaTitle, and metaDescription are required",
      });
    }

    const result = await createCategoryService({
      name,
      slug,
      description,
      image,
      metaTitle,
      metaDescription,
      status,
      priority,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Failed to create category" });
  }
};

// Update Category controller function
export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id);
        const {
            name,
            slug,
            description,
            image,
            metaTitle,
            metaDescription,
            status,
            priority,
        } = req.body;

        const result = await updateCategoryService(id, {
            name,
            slug,
            description,
            image,
            metaTitle,
            metaDescription,
            status,
            priority,
        });

        return res.status(200).json(result);
    } catch (error: any) {
        return res
            .status(500)
            .json({ message: error.message || "Failed to update category" });
    }
}
