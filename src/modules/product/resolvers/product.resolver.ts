import { Args, Query, Resolver } from '@nestjs/graphql';
import { TopProduct } from '../dto/top-product.dto';
import { ProductService } from '../services/product.service';

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Query(() => [TopProduct])
    async getTopSellingProducts(@Args('limit') limit: number) {
        return this.productService.getTopSellingProducts(limit);
    }
}
