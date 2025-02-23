import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from '../order/order.module';
import { ProductSchema } from './models/product.model';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductService } from './services/product.service';

@Module({
    imports: [
        forwardRef(() => OrderModule),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ],
    providers: [ProductService, ProductResolver],
})
export class ProductModule {}
