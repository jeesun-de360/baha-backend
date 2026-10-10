import { Color, IColor } from "./color.model";
import { slugify } from "../utils/helper";

// Create color service function
export const createColorService = async (data: Partial<IColor>) => {
  let { name, slug, hexCode, status } = data;

  if (!slug) {
    slug = slugify(name || "");
  }

  const existingColor = await Color.findOne({
    $or: [{ slug }, { hexCode }],
    status: { $ne: "deleted" },
  });
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
  if (data.name) {
    data.slug = slugify(data.name);
  }
  const updateColor = await Color.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updateColor) {
    throw new Error("Color not found");
  }
  return updateColor;
};

export const getAllColorsService = async (
  keyword: string,
  limit: number,
  offset: number,
  status: string,
) => {
  const filter: Record<string, any> = {
    status: { $ne: "deleted" },
  };

  if (keyword?.trim()) {
    const search = keyword.trim();

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

  if (status?.trim() && status !== 'all') {
    filter.status = status.trim();
  }

  const [colors, totalColors] = await Promise.all([
    Color.find(filter)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 }),

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
