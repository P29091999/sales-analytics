import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from '../product/models/product.model';
import { ProductModule } from '../product/product.module';
import { OrderSchema } from './models/order.model';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderService } from './services/order.service';

@Module({
    imports: [
        forwardRef(() => ProductModule),
        MongooseModule.forFeature([
            { name: 'Order', schema: OrderSchema },
            { name: 'Product', schema: ProductSchema },
        ]),
    ],
    providers: [OrderService, OrderResolver],
    exports: [MongooseModule],
})
export class OrderModule {}
