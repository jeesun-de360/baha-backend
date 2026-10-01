import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    slug: string
    name: string
    description?: string
    priority?: number
    status: string
    image: string
    metaTitle: string
    metaDescription: string
}

const CategorySchema = new Schema<ICategory>(
    {
        slug: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        priority: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        image: {
            type: String,
            required: true
        },
        metaTitle: {
            type: String,
            required: true
        },
        metaDescription: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
