import { Coupon, ICoupon } from "./coupon.model";

// Create coupon service function
export const createCouponService = async (data: Partial<ICoupon>) => {
  const {
    code,
    discountType,
    discountValue,
    minOrderSpend,
    maxCapDiscount,
    totalUsageLimit,
    limitPerCustomer,
    startDate,
    endDate,
    status,
    description,
  } = data;

  const existingCoupon = await Coupon.findOne({
    code: code?.toUpperCase().trim(),
  });

  if (existingCoupon) {
    throw new Error("Coupon with this code already exists");
  }

  const coupon = new Coupon({
    code,
    discountType,
    discountValue,
    minOrderSpend: minOrderSpend || 0,
    maxCapDiscount: maxCapDiscount || null,
    totalUsageLimit: totalUsageLimit || null,
    limitPerCustomer: limitPerCustomer || 1,
    startDate,
    endDate,
    status: status || "active",
    description,
  });

  await coupon.save();

  return coupon;
};

// Update coupon service function
export const updateCouponService = async (
  id: string,
  data: Partial<ICoupon>,
) => {
  const updatedCoupon = await Coupon.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedCoupon) {
    throw new Error("Coupon not found");
  }

  return updatedCoupon;
};

// Get all coupons service function
export const getAllCouponsService = async (
  keyword: string,
  limit: number,
  offset: number,
  status?: string,
) => {
  const query: Record<string, any> = {
    status: { $ne: "deleted" },
  };

  if (keyword?.trim()) {
    const search = keyword.trim();

    query.$or = [
      { code: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status && status?.trim() !== "all") {
    query.status = status.trim();
  }

  const result = await Coupon.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  const total = await Coupon.countDocuments(query);

  return {
    result,
    total,
  };
};

// Delete coupon service function
export const deleteCouponService = async (id: string) => {
  const deletedCoupon = await Coupon.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true },
  );

  if (!deletedCoupon) {
    throw new Error("Coupon not found");
  }

  return deletedCoupon;
};
