import mongoose, { Document, Schema } from "mongoose";

export interface IContactInfo extends Document {
  email: string;
  phone: string;
  address: string;
  whatsappNumber: string;
  facebookURL: string;
  instagramURL: string;
  youtubeURL: string;
  xURL: string;
}

const ContactInfoSchema = new Schema<IContactInfo>({
  email: {
    type: String,
    trim: true,
    default: "",
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  whatsappNumber: {
    type: String,
    trim: true,
    default: "",
  },
  facebookURL: {
    type: String,
    trim: true,
    default: "",
  },
  instagramURL: {
    type: String,
    trim: true,
    default: "",
  },
  youtubeURL: {
    type: String,
    trim: true,
    default: "",
  },
  xURL: {
    type: String,
    trim: true,
    default: "",
  },
});

export const ContactInfo = mongoose.model<IContactInfo>(
  "ContactInfo",
  ContactInfoSchema,
);
