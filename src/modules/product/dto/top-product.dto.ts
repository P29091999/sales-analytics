import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TopProduct {
    @Field()
    productId: string;

    @Field()
    name: string;

    @Field()
    totalSold: number;
}
