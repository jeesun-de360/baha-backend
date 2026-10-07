import { Size, ISize } from "./size.model";

// Create size service function
export const createSizeService = async (data: Partial<ISize>) => {
  const { name, minAge, maxAge, ageUnit, description, status, priority } = data;

  const existedSize = await Size.findOne({
    minAge: {
      $eq: minAge,
    },
    maxAge: {
      $eq: maxAge,
    },
    ageUnit: {
      $eq: ageUnit,
    },
  });

  if (existedSize) {
    throw new Error("Size already exists");
  }
  const size = new Size({
    name,
    minAge,
    maxAge,
    ageUnit,
    description,
    status: status || "active",
    priority: priority || 0,
  });

  await size.save();

  return size;
};

// Update size service function
export const updateSizeService = async (id: string, data: Partial<ISize>) => {
  const updateSize = await Size.findByIdAndUpdate(id, data, { new: true });

  if (!updateSize) {
    throw new Error("Size not found");
  }

  return updateSize;
};

// Get all Sizes service function
export const getAllSizesService = async (filters: {
  query?: string;
  sort?: "asc" | "desc";
  offset?: number;
  limit?: number;
}) => {
  const { query, sort = "asc", offset = 0, limit = 10 } = filters;

  const filter: Record<string, unknown> = {
    status: {
      $ne: "deleted",
    },
  };

  if (query?.trim()) {
    filter.name = {
      $regex: query.trim(),
      $options: "i",
    };
  }

  const result = await Size.find(filter)
    .sort({
      priority: sort === "asc" ? 1 : -1,
    })
    .skip(offset)
    .limit(limit);

  const total = await Size.countDocuments(filter);

  return { result, total };
};

// Delete size service funtion
export const deleteSizeService = async (id: string) => {
  const deleteSize = await Size.findByIdAndUpdate(
    id,
    {
      status: "deleted",
    },
    { new: true },
  );

  if (!deleteSize) {
    throw new Error("Size not found");
  }

  return deleteSize;
};
