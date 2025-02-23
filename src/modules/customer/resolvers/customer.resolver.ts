import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerSpending } from '../dto/customer-spending.dto';
import { CustomerService } from '../services/customer.service';

@Resolver()
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {}

    @Query(() => CustomerSpending)
    async getCustomerSpending(@Args('customerId') customerId: string) {
        return this.customerService.getCustomerSpending(customerId);
    }
}
