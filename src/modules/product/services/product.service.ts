import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/modules/order/models/order.model';
import { TopProductData } from '../interfaces/product.interface';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        @InjectModel('Order') private readonly orderModel: Model<Order>,
    ) {}

    /**
     * Retrieves the top-selling products based on order data.
     *
     * @param limit - The maximum number of top-selling products to return.
     * @returns A promise resolving to an array of top-selling products.
     */
    async getTopSellingProducts(limit: number): Promise<TopProductData[]> {
        try {
            const aggregation = await this.orderModel.aggregate([
                { $unwind: '$products' },
                {
                    $group: {
                        _id: '$products.productId',
                        totalSold: { $sum: '$products.quantity' },
                    },
                },
                { $sort: { totalSold: -1 } },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                { $unwind: '$product' },
                {
                    $project: {
                        productId: '$_id',
                        name: '$product.name',
                        totalSold: 1,
                    },
                },
            ]);

            return aggregation;
        } catch (error) {
            throw new InternalServerErrorException(
                `Error fetching top-selling products: ${error.message}`,
            );
        }
    }
}
