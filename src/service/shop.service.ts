import { Injectable, Logger } from '@nestjs/common';
import { IEleme } from '../interface/eleme.interface';
import { FoodService } from './food.service';
import { ElemeServer } from '../server/eleme.server';
import { ShopDao } from '../dao/shop.dao';
import { In } from 'typeorm';
import { ShopCreateDto } from '../dto/shop.dto';
import * as dayjs from '../util/dayjs.util';
import * as _ from '../util/lodash.util';
import { Shop } from '../model/shop.model';
import { OutputGetShopFlavorsDto } from '../dto/output.dto';

@Injectable()
export class ShopService {

    constructor(
        private readonly shopDao: ShopDao,
        private readonly foodService: FoodService,
        private readonly elemeServer: ElemeServer,
    ) { }

    public async bulkCreate(dto: ShopCreateDto) {
        const day = dayjs().format('YYYY-MM-DD');

        Logger.log(`开始处理 ${day} 的 Shop`);

        let elemeShops: IEleme.Shop[] = [];
        let count = 1;
        do {
            elemeShops = await this.elemeServer.getShops(dto, count * 30, (count - 1) * 30);
            Logger.log(`第${count}次, 开始处理 ${elemeShops.length}个店`);

            const shops: Shop[] = [];
            for (const elemeShop of elemeShops) {
                await this.shopDao.upsert({
                    openId: elemeShop.id,
                    day,
                }, {
                        openId: elemeShop.id,
                        name: elemeShop.name,
                        day,
                        data: elemeShop,
                    });

                const shop = await this.shopDao.findOne({
                    where: {
                        day,
                        openId: elemeShop.id,
                    },
                });
                if (!shop) continue;
                shops.push(shop);
            }
            count++;
            await this.foodService.bulkCreateByShop(shops);
        } while (!_.isEmpty(elemeShops));

        Logger.log(`${day} 的数据处理完毕`);
    }

    public async getShopFlavors(query: OutputGetShopFlavorsDto) {
        const shops = await this.shopDao.findAll();
        const uniqShops = _.uniqBy(shops, 'name');
        const shopFlavors = _.reduce(uniqShops, (result: string[], shop: Shop) => {
            const flavors: { id: number, name: string }[] | undefined = _.get(shop, 'data.flavors');
            if (!flavors) return result;
            result.push(...flavors.map(v => v.name));
            return result;
        }, []);
        return _.countBy(shopFlavors);
    }

}