import { Injectable, HttpService } from '@nestjs/common';
import { ShopCreateDto } from '../dto/shop.dto';
import { ConfigService } from '../provider/config/config.service';
import { IEleme } from '../interface/eleme.interface';
import * as _ from '../util/lodash.util';
import { $ } from '../util/support.util';
import * as Qs from 'qs';

@Injectable()
export class ElemeServer {

    private cookie: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.cookie = this.config.get('ELEME_COOKIES');
    }

    public async getShops(dto: ShopCreateDto, limit: number, offset: number): Promise<IEleme.Shop[]> {
        $.sleep(1000);
        const url = 'https://www.ele.me/restapi/shopping/restaurants';
        const params = Qs.stringify({
            'extras[]': 'activities',
            'geohash': 'wtw3q54syupy',
            'latitude': dto.latitude,
            'limit': limit,
            'longitude': dto.longitude,
            'offset': offset,
            // 'restaurant_category_ids[]': -102,
            // 'sign': 1527924670322,
            'terminal': 'web',
        });

        const res = await this.httpService.get(`${url}?${params}`, {
            headers: {
                Cookie: this.cookie,
            },
        }).toPromise();

        /**
         * 饿了么 动态 Cookies, 用来调整分页
         */
        const cookies = this.cookie.split(';');
        const cookieDynamic = res.headers['set-cookie'][0].split(';')[0];
        cookies.pop();
        cookies.push(cookieDynamic);
        this.cookie = cookies.join(';');

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
        const params = Qs.stringify({
            restaurant_id: openShopId,
            terminal: 'web',
        });
        const res = await this.httpService.get(`${url}?${params}`, {
            headers: {
                Cookie: this.cookie,
            },
        }).toPromise();
        return res.data;
    }

}