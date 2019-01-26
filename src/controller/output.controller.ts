import { Controller, Get, Query } from '@nestjs/common';
import { ShopService } from '../service/shop.service';
import { OutputGetShopFlavorsQueryDto, OutputGetShopFlavorsResDto } from '../dto/output.dto';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';

@ApiUseTags('Api 中心')
@Controller('outputs')
export class OutputController {

    constructor(
        private readonly shopService: ShopService,
    ) { }

    @ApiOperation({ title: '获取某个坐标附近, 所有的店铺种类数量' })
    @ApiResponse({ status: 200, type: OutputGetShopFlavorsResDto, isArray: true })
    @Get('shop_falvors')
    public async getShopFlavors(
        @Query() query: OutputGetShopFlavorsQueryDto,
    ): Promise<OutputGetShopFlavorsResDto[]> {
        return this.shopService.getShopFlavors(query);
    }

}