import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopDao } from '../dao/shop.dao';
import { MenuDao } from '../dao/menu.dao';
import { FoodDao } from '../dao/food.dao';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'eleme-data-center',
            entities: [__dirname + '/../model/**/*.model{.ts,.js}'],
        }),
    ],
    providers: [ShopDao, MenuDao, FoodDao],
    exports: [ShopDao, MenuDao, FoodDao],
})
export class DaoModule { }
