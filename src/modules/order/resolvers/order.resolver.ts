import { Args, Query, Resolver } from '@nestjs/graphql';
import { SalesAnalytics } from '../dto/sales-analytics.dto';
import { OrderService } from '../services/order.service';

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}

    @Query(() => SalesAnalytics)
    async getSalesAnalytics(
        @Args('startDate', { type: () => String }) startDate: string,
        @Args('endDate', { type: () => String }) endDate: string,
    ) {
        if (!startDate || !endDate) {
            throw new Error('startDate and endDate are required.');
        }

        return this.orderService.getSalesAnalytics(startDate, endDate);
    }
}
