import { Category, ICategory } from "./category.model";

// Create Category service function
export const createCategoryService = async (data: Partial<ICategory>) => {
  const {
    name,
    slug,
    description,
    image,
    metaTitle,
    metaDescription,
    status,
    priority,
  } = data;

  // Auto-generate slug from name if not provided
  const resolvedSlug = slug || name?.trim().toLowerCase().replace(/\s+/g, "-");

  // Check for duplicate slug or name
  const existingCategory = await Category.findOne({
    $or: [{ slug: resolvedSlug }, { name }],
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = new Category({
    slug: resolvedSlug,
    name,
    description,
    image,
    metaTitle,
    metaDescription,
    status: status || "active",
    priority: priority || 0,
  });

  await category.save();

  return category;
};

// Update Category service function
export const updateCategoryService = async (
  id: string,
  data: Partial<ICategory>,
) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedCategory) {
    throw new Error("Category not found");
  }

  return updatedCategory;
};

// Get all categories service function
export const getAllCategoriesService = async (
  search: string,
  limit: number,
  offset: number,
  status?: string,
) => {
  const query: Record<string, any> = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { metaTitle: { $regex: search, $options: "i" } },
      { metaDescription: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const result = await Category.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  const total = await Category.countDocuments(query);

  return {
    result,
    total,
  };
};

// Delete category service function
export const deleteCategoryService = async (id: string) => {
  const deletedCategory = await Category.findByIdAndUpdate(
    id,
    { status: "inactive" },
    {
      new: true,
    },
  );

  if (!deletedCategory) {
    throw new Error("Category not found");
  }

  return deletedCategory;
};
