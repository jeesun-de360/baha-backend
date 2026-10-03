import { Testimonial, ITestimonial } from "./testimonial.model";

// Create testimonial service function
export const createTestimonialService = async (
  data: Partial<ITestimonial>,
) => {
  const { customerName, customerRole, rating, status, avatar, review } = data;

  const testimonial = new Testimonial({
    customerName,
    customerRole,
    rating: rating || 5,
    status: status || "active",
    avatar,
    review,
  });

  await testimonial.save();

  return testimonial;
};

// Update testimonial service function
export const updateTestimonialService = async (
  id: string,
  data: Partial<ITestimonial>,
) => {
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedTestimonial) {
    throw new Error("Testimonial not found");
  }

  return updatedTestimonial;
};

// Get all testimonials service function
export const getAllTestimonialsService = async (
  search: string,
  limit: number,
  offset: number,
  status?: string,
) => {
  const query: Record<string, any> = {};

  if (search) {
    query.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { customerRole: { $regex: search, $options: "i" } },
      { review: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const result = await Testimonial.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  const total = await Testimonial.countDocuments(query);

  return {
    result,
    total,
  };
};

// Delete testimonial service function
export const deleteTestimonialService = async (id: string) => {
  const deletedTestimonial = await Testimonial.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true },
  );

  if (!deletedTestimonial) {
    throw new Error("Testimonial not found");
  }

  return deletedTestimonial;
};
