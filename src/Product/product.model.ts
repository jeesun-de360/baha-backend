import mongoose, { Document, Schema, Types } from "mongoose";

// ─── Sub-document: Product Variant ───────────────────────────────────────────
export interface IProductVariant {
  sku: string;
  size: Types.ObjectId;       // ref: Size
  color: Types.ObjectId;      // ref: Color
  stock: number;
  isAvailable: boolean;
}

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: "Size",
      required: true,
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

// ─── Sub-document: Product Specification ─────────────────────────────────────
export interface IProductSpec {
  label: string;
  value: string;
}

const ProductSpecSchema = new Schema<IProductSpec>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

// ─── Main Interface ───────────────────────────────────────────────────────────
export interface IProduct extends Document {
  // Core info
  name: string;
  slug: string;
  description?: string;
  status: "active" | "inactive" | "deleted";
  isFeatured: boolean;

  // Media
  image: string;              // primary/thumbnail image
  gallery: string[];          // additional images

  // Pricing
  price: number;
  discountPrice?: number;

  // Categorisation
  category: Types.ObjectId;   // ref: Category

  // Inventory (top-level SKU — used when no variants)
  sku?: string;

  // Variants (size x color combinations with individual stock)
  variants: IProductVariant[];

  // Product details
  fabric?: string;
  careInstructions?: string;
  ageSuitability?: string;    // e.g. "0-3 months", "3-5 years"
  sizeChart?: string;         // URL to size-chart image or doc

  // Extended specifications (key/value pairs)
  specifications: IProductSpec[];

  // Related products (manually configured by admin)
  relatedProducts: Types.ObjectId[];  // ref: Product

  // Virtual Try-On
  isVirtualTryOnEnabled: boolean;
  virtualTryOnAssetUrl?: string;      // 3D model / AR asset URL

  // SEO / ratings
  metaTitle?: string;
  metaDescription?: string;
  rating: number;
  numReviews: number;
}

// ─── Main Schema ──────────────────────────────────────────────────────────────
const ProductSchema = new Schema<IProduct>(
  {
    // Core info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Media
    image: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },

    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },

    // Categorisation
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // Top-level SKU (when variants are not used)
    sku: {
      type: String,
      trim: true,
    },

    // Variants
    variants: {
      type: [ProductVariantSchema],
      default: [],
    },

    // Product details
    fabric: {
      type: String,
    },
    careInstructions: {
      type: String,
    },
    ageSuitability: {
      type: String,
    },
    sizeChart: {
      type: String,
    },

    // Extended specifications
    specifications: {
      type: [ProductSpecSchema],
      default: [],
    },

    // Related products (manually set by admin)
    relatedProducts: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },

    // Virtual Try-On
    isVirtualTryOnEnabled: {
      type: Boolean,
      default: false,
    },
    virtualTryOnAssetUrl: {
      type: String,
    },

    // SEO
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },

    // Ratings (aggregated)
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ "variants.sku": 1 });

// ─── Model ────────────────────────────────────────────────────────────────────
export const Product = mongoose.model<IProduct>("Product", ProductSchema);
