import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
    name: string
    slug: string
    description?: string
    category: string
    price: number
    image: string
    status: string
    isFeatured: boolean
    rating?: number
    numReviews?: number
}
