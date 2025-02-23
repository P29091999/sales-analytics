import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from '../order/order.module';
import { CustomerSchema } from './models/customer.model';
import { CustomerResolver } from './resolvers/customer.resolver';
import { CustomerService } from './services/customer.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Customer', schema: CustomerSchema },
        ]),
        OrderModule,
    ],
    providers: [CustomerService, CustomerResolver],
})
export class CustomerModule {}
