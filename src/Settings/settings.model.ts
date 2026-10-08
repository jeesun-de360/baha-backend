import mongoose, { Document, Schema } from "mongoose";

export interface IContactInfo extends Document {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { _id: false },
);

export interface ISocialLinks extends Document {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    youtube: {
      type: String,
    },
  },
  { _id: false },
);

export interface IPaymentInfo extends Document {
  prepaidDeliveryFee: number;
  freePrepaidDeliveryOn: number;
  codDeliveryFee: number;
  freeCodDeliveryOn: number;
  maxFreeCodDeliveryOn: number;
}

const PaymentInfoSchema = new Schema<IPaymentInfo>(
  {
    prepaidDeliveryFee: {
      type: Number,
      default: 0,
    },
    freePrepaidDeliveryOn: {
      type: Number,
      default: 0,
    },
    codDeliveryFee: {
      type: Number,
      default: 0,
    },
    freeCodDeliveryOn: {
      type: Number,
      default: 0,
    },
    maxFreeCodDeliveryOn: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

export interface ISettings extends Document {
  contactInfo: IContactInfo;
  socialLinks: ISocialLinks;
  paymentInfo: IPaymentInfo;
  privacyPolicy: string;
  termsConditions: string;
  shippingPolicy: string;
  returnPolicy: string;
}

const SettingsSchema = new Schema<ISettings>({
  contactInfo: {
    type: ContactInfoSchema,
    default: {},
  },
  socialLinks: {
    type: SocialLinksSchema,
    default: {},
  },
  paymentInfo: {
    type: PaymentInfoSchema,
    default: {},
  },
  privacyPolicy: {
    type: String,
    default: "",
  },
  termsConditions: {
    type: String,
    default: "",
  },
  shippingPolicy: {
    type: String,
    default: "",
  },
  returnPolicy: {
    type: String,
    default: "",
  },
});

export const Setting = mongoose.model<ISettings>("Setting", SettingsSchema);
