import { FAQ, IFAQ } from "./faq.model";

// Create FAQ service function
export const createFAQService = async (data: Partial<IFAQ>) => {
  const { question, answer, status, order } = data;

  let nextOrder = 0;
  if (!order) {
    const totalFAQs = await FAQ.countDocuments();
    nextOrder = totalFAQs + 1;
  }

  const faq = new FAQ({
    question,
    answer,
    status: status || "active",
    order: order || nextOrder,
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
) => {
  const query: Record<string, any> = {};

  if (search) {
    query.$or = [
      { question: { $regex: search, $options: "i" } },
      { answer: { $regex: search, $options: "i" } },
    ];
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
  const deletedFAQ = await FAQ.findByIdAndDelete(id);

  if (!deletedFAQ) {
    throw new Error("FAQ not found");
  }

  return deletedFAQ;
};
