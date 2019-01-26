import { Injectable, HttpService } from '@nestjs/common';
import { ShopCreateDto } from '../dto/shop.dto';
import { ConfigService } from '../provider/config/config.service';
import { IEleme } from '../interface/eleme.interface';
import * as _ from '../util/lodash.util';
import { $ } from '../util/support.util';

@Injectable()
export class ElemeServer {

    private readonly cookie: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.cookie = this.config.get('ELEME_COOKIES');
    }

    public async getShops(dto: ShopCreateDto, limit: number, offset: number): Promise<IEleme.Shop[]> {
        $.sleep(1000);
        const url = 'https://www.ele.me/restapi/shopping/restaurants';
        const params = {
            'extras[]': 'activities',
            'geohash': 'wtw3q54syupy',
            'latitude': dto.latitude,
            'limit': limit,
            'longitude': dto.longitude,
            'offset': offset,
            'restaurant_category_ids[]': -102,
            'sign': 1527924670322,
            'terminal': 'web',
        };
        const res = await this.httpService.get(url, {
            headers: {
                Cookie: this.cookie,
            },
            params,
        }).toPromise();
        return res.data;
    }

    public async getFoods(openShopId: string): Promise<IEleme.Food[]> {
        const menus = await this.getMenus(openShopId);
        let foods: IEleme.Food[] = [];
        for (const menu of menus) {
            foods = _.union(foods, menu.foods);
        }
        return foods;
    }

    public async getMenus(openShopId: string): Promise<IEleme.Menu[]> {
        $.sleep(1000);

        const url = 'https://www.ele.me/restapi/shopping/v2/menu';
        const params = {
            restaurant_id: openShopId,
            terminal: 'web',
        };
        const res = await this.httpService.get(url, {
            headers: {
                Cookie: this.cookie,
            },
            params,
        }).toPromise();
        return res.data;
    }

}