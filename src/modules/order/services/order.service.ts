import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/modules/product/models/product.model';
import { SalesAnalyticsData } from '../interfaces/order.interface';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    /**
     * Retrieves sales analytics data for a given date range.
     *
     * @param startDate - The start date of the period (ISO string).
     * @param endDate - The end date of the period (ISO string).
     * @returns A promise resolving to sales analytics data.
     */
    async getSalesAnalytics(
        startDate: string,
        endDate: string,
    ): Promise<SalesAnalyticsData> {
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error('Invalid date format. Please use YYYY-MM-DD.');
            }

            const orders = await this.orderModel
                .find({
                    orderDate: { $gte: start, $lte: end },
                    status: 'completed',
                })
                .exec();

            const totalRevenue = orders.reduce(
                (sum, order) => sum + Number(order.totalAmount),
                0,
            );

            const completedOrders = orders.length;

            const categoryBreakdown = await this.orderModel.aggregate([
                {
                    $match: {
                        orderDate: { $gte: start, $lte: end },
                        status: 'completed',
                    },
                },
                { $unwind: '$products' },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'products.productId',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                { $unwind: '$product' },
                {
                    $group: {
                        _id: '$product.category',
                        revenue: {
                            $sum: {
                                $multiply: [
                                    '$products.quantity',
                                    '$products.priceAtPurchase',
                                ],
                            },
                        },
                    },
                },
                { $project: { category: '$_id', revenue: 1 } },
            ]);

            return {
                totalRevenue,
                completedOrders,
                categoryBreakdown,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Error fetching sales analytics: ${error.message}`,
            );
        }
    }
}
