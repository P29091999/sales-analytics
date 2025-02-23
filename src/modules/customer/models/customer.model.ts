import { Document, Schema } from 'mongoose';

export const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    gender: { type: String, required: true },
});

export interface Customer extends Document {
    name: string;
    email: string;
    age: number;
    location: string;
    gender: string;
}
