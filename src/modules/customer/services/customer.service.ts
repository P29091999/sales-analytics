import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from 'src/modules/order/models/order.model';
import { CustomerSpendingData } from '../interfaces/customer.interface';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('Customer')
        private readonly customerModel: Model<Customer>,
        @InjectModel('Order') private readonly orderModel: Model<Order>,
    ) {}

    /**
     * Retrieves customer spending details based on completed orders.
     *
     * @param customerId - The ID of the customer.
     * @returns A promise resolving to customer spending data.
     */
    async getCustomerSpending(
        customerId: string,
    ): Promise<CustomerSpendingData> {
        try {
            const customerObjectId = new Types.ObjectId(customerId);

            const orders = await this.orderModel
                .find({
                    customerId: customerObjectId,
                    status: 'completed',
                })
                .exec();

            if (orders.length === 0) {
                return {
                    customerId,
                    totalSpent: 0,
                    averageOrderValue: 0,
                    lastOrderDate: null,
                };
            }

            const totalSpent = orders.reduce(
                (sum, order) => sum + Number(order.totalAmount),
                0,
            );

            const roundedTotalSpent = parseFloat(totalSpent.toFixed(2));
            const roundedAverageOrderValue = parseFloat(
                (roundedTotalSpent / orders.length).toFixed(2),
            );

            const lastOrderDate = new Date(
                orders[orders.length - 1].orderDate,
            ).toISOString();

            return {
                customerId,
                totalSpent: roundedTotalSpent,
                averageOrderValue: roundedAverageOrderValue,
                lastOrderDate,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Error fetching customer spending: ${error.message}`,
            );
        }
    }
}
