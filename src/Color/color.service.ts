import { Color, IColor } from "./color.model";

// Create color service function
export const createColorService = async (data: Partial<IColor>) => {
  const { name, slug, status, hexCode, priority } = data;

  const existingColor = await Color.findOne({ $or: [{ slug }, { hexCode }] });
  if (existingColor) {
    throw new Error("Color already exists");
  }
  const color = new Color({
    name,
    slug,
    hexCode,
    priority: priority || 0,
  });
  await color.save();
  return color;
};

// Update color service function
export const updateColorService = async (id: string, data: Partial<IColor>) => {
  const updateColor = await Color.findByIdAndUpdate(id, data, { new: true });

  if (!updateColor) {
    throw new Error("Color not found");
  }
  return updateColor;
};

// Get all colors service function
export const getAllColorsService = async (filters: {
  query?: string;
  sort?: "asc" | "desc";
}) => {
  const { query, sort = "asc" } = filters;

  const colors = await Color.find({
    $or: [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        hexCode: {
          $regex: query,
          $options: "i",
        },
      },
    ],
  }).sort({ priority: sort === "asc" ? 1 : -1 });

  return colors;
};

// Delete color service function
export const deleteColorService = async (id: string) => {
  const deleteColor = await Color.findByIdAndUpdate(
    id,
    {
      status: "inactive",
    },
    { new: true },
  );

  if (!deleteColor) {
    throw new Error("Color not found");
  }

  return deleteColor;
};
