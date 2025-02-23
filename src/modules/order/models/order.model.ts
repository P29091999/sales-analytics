import { Document, Schema } from 'mongoose';

export const OrderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true },
            priceAtPurchase: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
});

export interface Order extends Document {
    customerId: string;
    products: {
        productId: string;
        quantity: number;
        priceAtPurchase: number;
    }[];
    totalAmount: number;
    orderDate: Date;
    status: string;
}
