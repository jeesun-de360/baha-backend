import { HeroSlider, IHeroSlider } from "./heroSlider.model";

// Create hero slider service function
export const createHeroSliderService = async (data: Partial<IHeroSlider>) => {
  const {
    title,
    subTitle,
    image,
    mobileImage,
    buttonLabel,
    buttonLink,
    status,
    order,
    startDate,
    endDate,
  } = data;

  const existedHeroSlider = await HeroSlider.findOne({
    order: {
      $eq: order,
    },
  });

  if (existedHeroSlider) {
    throw new Error("Hero slider with this order already exists");
  }

  const heroSlider = new HeroSlider({
    title,
    subTitle,
    image,
    mobileImage,
    buttonLabel,
    buttonLink,
    status: status || "active",
    order: order || 0,
    startDate,
    endDate,
  });

  await heroSlider.save();

  return heroSlider;
};

// Update hero slider service funtion
export const updateHeroSliderService = async (
  id: string,
  data: Partial<IHeroSlider>,
) => {
  const updatedHeroSlider = await HeroSlider.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updatedHeroSlider) {
    throw new Error("Hero slider not found");
  }

  return updatedHeroSlider;
};

// Get all hero slider service function
export const getAllHeroSlidersService = async (
  query: string,
  limit: number,
  offset: number,
  status?: string,
) => {
  const filter: Record<string, unknown> = {};

  if (query?.trim()) {
    filter.title = {
      $regex: query.trim(),
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  const result = await HeroSlider.find(filter).skip(offset).limit(limit);
  const total = await HeroSlider.countDocuments(filter);

  return {
    result,
    total,
  };
};

// Delete hero slider service function
export const deleteHeroSliderService = async (id: string) => {
  const deletedHeroSlider = await HeroSlider.findByIdAndUpdate(
    id,
    {
      status: "inactive",
    },
    { new: true },
  );

  if (!deletedHeroSlider) {
    throw new Error("Hero slider not found");
  }

  return deletedHeroSlider;
};
