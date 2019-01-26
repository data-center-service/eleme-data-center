import { Controller, Get, Query } from '@nestjs/common';
import { ShopService } from '../service/shop.service';
import { OutputGetShopFlavorsQueryDto } from '../dto/output.dto';

@Controller('outputs')
export class OutputController {

    constructor(
        private readonly shopService: ShopService,
    ) { }

    @Get('shop_falvors')
    public async getShopFlavors(
        @Query() query: OutputGetShopFlavorsQueryDto,
    ) {
        return this.shopService.getShopFlavors(query);
    }

}