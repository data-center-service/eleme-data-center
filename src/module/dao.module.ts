import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopDao } from '../dao/shop.dao';
import { MenuDao } from '../dao/menu.dao';
import { FoodDao } from '../dao/food.dao';
import { ConfigService } from '../provider/config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mongodb',
                    host: configService.get('MONGO_HOST'),
                    port: configService.MONGO_PORT,
                    database: configService.get('MONGO_DB'),
                    entities: [__dirname + '/../model/**/*.model{.ts,.js}'],
                    useNewUrlParser: true,
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [ShopDao, MenuDao, FoodDao],
    exports: [ShopDao, MenuDao, FoodDao],
})
export class DaoModule { }
