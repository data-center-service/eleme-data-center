import { Module } from '@nestjs/common';
import { DaoModule } from './dao.module';
import { ShopService } from '../service/shop.service';
import { FoodService } from '../service/food.service';
import { ServerModule } from './server.module';

@Module({
    imports: [
        DaoModule,
        ServerModule,
    ],
    providers: [
        ShopService, FoodService,
    ],
    exports: [
        ShopService, FoodService,
    ],
})
export class ServiceModule { }
