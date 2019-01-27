import { Injectable, Logger } from '@nestjs/common';
import { IEleme } from '../interface/eleme.interface';
import { FoodService } from './food.service';
import { ElemeServer } from '../server/eleme.server';
import { ShopDao } from '../dao/shop.dao';
import { ShopCreateDto, ShopFlavorsResDto, ShopFlavorsQueryDto } from '../dto/shop.dto';
import * as dayjs from '../util/dayjs.util';
import * as _ from '../util/lodash.util';
import { Shop } from '../model/shop.model';

@Injectable()
export class ShopService {

    constructor(
        private readonly shopDao: ShopDao,
        private readonly foodService: FoodService,
        private readonly elemeServer: ElemeServer,
    ) { }

    public async bulkCreate(dto: ShopCreateDto) {
        const day = dayjs().format('YYYY-MM-DD');

        Logger.log(`${day} 任务开始`);

        let elemeShops: IEleme.Shop[] = [];
        let count = 1;
        do {
            elemeShops = await this.elemeServer.getShops(dto, 24, (count - 1) * 24);
            Logger.log(`第${count}次, 开始处理 ${elemeShops.length}个店`);

            for (const elemeShop of elemeShops) {
                await this.shopDao.upsert({
                    day,
                    openId: elemeShop.id,
                }, {
                        openId: elemeShop.id,
                        name: elemeShop.name,
                        day,
                        data: elemeShop,
                    });
            }

            count++;

            const shops = await this.shopDao.findAll({
                where: {
                    day,
                    openId: { $in: elemeShops.map(v => v.id) },
                },
            });
            await this.foodService.bulkCreateByShop(shops);

            Logger.log(`处理完成 ${elemeShops.length}个店`);
        } while (!_.isEmpty(elemeShops));

        Logger.log(`${day} 的数据处理完毕`);
    }

    public async getShopFlavors(query: ShopFlavorsQueryDto): Promise<ShopFlavorsResDto[]> {
        const shops = await this.shopDao.findAll({
            where: {
                $and: [
                    {
                        'data.latitude': { $gte: Number(query.latitude) - 0.02 },
                        'data.longitude': { $gte: Number(query.longitude) - 0.02 },
                    },
                    {
                        'data.latitude': { $lte: Number(query.latitude) + 0.02 },
                        'data.longitude': { $lte: Number(query.longitude) + 0.02 },
                    },
                ],
            },
        });
        const uniqShops = _.uniqBy(shops, 'name');
        const shopFlavors = _.reduce(uniqShops, (result: string[], shop: Shop) => {
            const flavors: { id: number, name: string }[] | undefined = _.get(shop, 'data.flavors');
            if (!flavors) return result;
            result.push(...flavors.map(v => v.name));
            return result;
        }, []);

        const resObj = _.countBy(shopFlavors);
        const res: ShopFlavorsResDto[] = [];
        for (const flavorName in resObj) {
            res.push({
                flavorName,
                count: resObj[flavorName],
            });
        }
        return res;
    }

}