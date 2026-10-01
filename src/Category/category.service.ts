import { Category, ICategory } from "./category.model";

// Create Category service function
export const createCategoryService = async (data: Partial<ICategory>) => {
  const { name, slug, description, image, metaTitle, metaDescription, status, priority } = data;

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
export const updateCategoryService = async (id: string, data: Partial<ICategory>) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

  if (!updatedCategory) {
    throw new Error("Category not found");
  }

  return updatedCategory;
};
