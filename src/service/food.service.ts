import { Injectable } from '@nestjs/common';
import { Shop } from '../model/shop.model';
import { ElemeServer } from '../server/eleme.server';
import { FoodDao } from '../dao/food.dao';
import * as dayjs from '../util/dayjs.util';
import * as _ from '../util/lodash.util';

@Injectable()
export class FoodService {

    constructor(
        private readonly elemeServer: ElemeServer,
        private readonly foodDao: FoodDao,
    ) { }

    public async bulkCreateByShop(shops: Shop[]) {
        const tasks: Promise<any>[] = [];
        const day = dayjs().format('YYYY-MM-DD');

        console.log(`开始处理 ${day} 的 Food, ${shops.length}个店`);

        for (const shop of shops) {
            const foods = await this.elemeServer.getFoods(shop.openId);
            for (const food of foods) {
                const task = this.foodDao.upsert({
                    shopId: shop.id.toString(),
                    openId: food.item_id,
                    day,
                }, {
                        data: food,
                        name: food.name,
                        openId: food.virtual_food_id,
                        shopId: shop.id.toString(),
                        day,
                    });
                tasks.push(task);
            }
            console.log(`处理 ${shop.name} Food`);
        }
        return Promise.all(tasks);
    }

}