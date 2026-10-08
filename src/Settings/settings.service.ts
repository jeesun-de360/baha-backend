import { Setting, IContactInfo, ISocialLinks, IPaymentInfo } from "./settings.model";


// Add Settings Service Functions here
// Add and Update settings contact info service function
export const updateContactInfoService = async (
  data: Partial<IContactInfo>
) => {
  const update: Record<string, unknown> = {};

  Object.entries(data).forEach(([key, value]) => {
    update[`contactInfo.${key}`] = value;
  });

  return await Setting.findOneAndUpdate(
    {},
    { $set: update },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
};

// Add and update settings social links service function
export const updateSocialLinkService = async (data: Partial<ISocialLinks>) => {
  const update: Record<string, unknown> = {};

  Object.entries(data).forEach(([key, value]) => {
    update[`socialLinks.${key}`] = value;
  });

  return await Setting.findOneAndUpdate(
    {},
    { $set: update },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
}

// Add and update payment info service function
export const updatePaymentInfoService = async (data: Partial<IPaymentInfo>) => {
    const update: Record<string, unknown> = {};

    Object.entries(data).forEach(([key, value]) => {
        update[`paymentInfo.${key}`] = value;
    });

    return await Setting.findOneAndUpdate(
        {},
        { $set: update },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
}

// Add and update privacy policy service function
export const updatePrivacyPolicyService = async (data: string) => {
    return await Setting.findOneAndUpdate(
        {},
        { $set: { privacyPolicy: data } },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
}

// Add and update terms and conditions service function
export const updateTermsAndConditionsService = async (data: string) => {
    return await Setting.findOneAndUpdate(
        {},
        { $set: { termsConditions: data } },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
}

// Add and update shipping policy service function
export const updateShippingPolicyService = async (data: string) => {
    return await Setting.findOneAndUpdate(
        {},
        { $set: { shippingPolicy: data } },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
}

// Add and update return policy service function
export const updateReturnPolicyService = async (data: string) => {
    return await Setting.findOneAndUpdate(
        {},
        { $set: { returnPolicy: data } },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
}

// Get all settings service function
export const getAllSettingsService = async () => {
    return await Setting.findOne({});
}
