import { Controller, Get, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { ShopService } from '../service/shop.service';
import { ShopCreateDto } from '../dto/shop.dto';
import { OutputGetShopFlavorsDto } from '../dto/output.dto';

@Controller('outputs')
export class OutputController {

    constructor(
        private readonly shopService: ShopService,
    ) { }

    // @UsePipes(ParseIntPipe)
    @Get('shop_falvors')
    public async getShopFlavors(
        @Query() query: OutputGetShopFlavorsDto,
    ) {
        return this.shopService.getShopFlavors(query);
    }

}