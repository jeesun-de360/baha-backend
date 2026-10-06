import mongoose, { Document, Schema } from "mongoose";

export interface IColor extends Document {
    name: string
    slug: string
    status: 'active' | 'inactive' | 'deleted'
    hexCode: string
    priority?: number
}

const ColorSchema = new Schema<IColor>(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'deleted'],
            default: 'active'
        },
        hexCode: {
            type: String,
            required: true
        },
        priority: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const Color = mongoose.model<IColor>('Color', ColorSchema)
