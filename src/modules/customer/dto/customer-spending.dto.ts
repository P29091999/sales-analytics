import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerSpending {
    @Field()
    customerId: string;

    @Field()
    totalSpent: number;

    @Field()
    averageOrderValue: number;

    @Field()
    lastOrderDate: string;
}
