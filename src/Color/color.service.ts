import { Color, IColor } from "./color.model";
import { slugify } from "../utils/helper";

// Create color service function
export const createColorService = async (data: Partial<IColor>) => {
  let { name, slug, hexCode, status } = data;

  if (!slug) {
    slug = slugify(name || "");
  }

  const existingColor = await Color.findOne({ $or: [{ slug }, { hexCode }], status: { $ne: "deleted"} });
  if (existingColor) {
    throw new Error("Color already exists");
  }
  const color = new Color({
    name,
    slug,
    hexCode,
    status,
  });
  await color.save();
  return color;
};

// Update color service function
export const updateColorService = async (id: string, data: Partial<IColor>) => {
  if(data.name){
    data.slug = slugify(data.name);
  }
  const updateColor = await Color.findByIdAndUpdate(id, data, { new: true, runValidators: true, });

  if (!updateColor) {
    throw new Error("Color not found");
  }
  return updateColor;
};

interface GetAllColorsFilters {
  query?: string;
  sortBy?: "name" | "hexCode" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  offset?: number;
  limit?: number;
}

export const getAllColorsService = async ({
  query,
  sortBy = "name",
  sortOrder = "asc",
  offset = 0,
  limit = 20,
}: GetAllColorsFilters) => {
  const filter: Record<string, any> = {
    status: { $ne: "deleted" },
  };

  if (query?.trim()) {
    const search = query.trim();

    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        hexCode: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const sortDirection = sortOrder === "desc" ? -1 : 1;

  const [colors, totalColors] = await Promise.all([
    Color.find(filter)
      .sort({
        [sortBy]: sortDirection,
        _id: 1,
      })
      .skip(offset)
      .limit(limit)
      .lean(),

    Color.countDocuments(filter),
  ]);

  return {
    colors,
    totalColors,
  };
};

// Delete color service function
export const deleteColorService = async (id: string) => {
  const deleteColor = await Color.findByIdAndUpdate(
    id,
    {
      status: "deleted",
    },
    { new: true },
  );

  if (!deleteColor) {
    throw new Error("Color not found");
  }

  return deleteColor;
};
