import { FAQ, IFAQ } from "./faq.model";

// Create FAQ service function
export const createFAQService = async (data: Partial<IFAQ>) => {
  const { category, question, answer, status, order } = data;

  const faq = new FAQ({
    category,
    question,
    answer,
    status: status || "active",
    order: order || 0,
  });

  await faq.save();

  return faq;
};

// Update FAQ service function
export const updateFAQService = async (id: string, data: Partial<IFAQ>) => {
  const updatedFAQ = await FAQ.findByIdAndUpdate(id, data, { new: true });

  if (!updatedFAQ) {
    throw new Error("FAQ not found");
  }

  return updatedFAQ;
};

// Get all FAQs service function
export const getAllFAQsService = async (
  search: string,
  limit: number,
  offset: number,
  status?: string,
  category?: string,
) => {
  const query: Record<string, any> = {};

  if (search) {
    query.$or = [
      { question: { $regex: search, $options: "i" } },
      { answer: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (category) {
    query.category = category;
  }

  const result = await FAQ.find(query)
    .sort({ order: 1, createdAt: -1 })
    .skip(offset)
    .limit(limit);
  const total = await FAQ.countDocuments(query);

  return {
    result,
    total,
  };
};

// Delete FAQ service function
export const deleteFAQService = async (id: string) => {
  const deletedFAQ = await FAQ.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true },
  );

  if (!deletedFAQ) {
    throw new Error("FAQ not found");
  }

  return deletedFAQ;
};
