import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryRevenue {
    @Field()
    category: string;

    @Field()
    revenue: number;
}

@ObjectType()
export class SalesAnalytics {
    @Field()
    totalRevenue: number;

    @Field()
    completedOrders: number;

    @Field(() => [CategoryRevenue])
    categoryBreakdown: CategoryRevenue[];
}
