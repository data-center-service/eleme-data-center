import { Controller, Get, Query } from '@nestjs/common';
import { ShopService } from '../service/shop.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { ShopCreateDto, ShopFlavorsQueryDto, ShopFlavorsResDto } from '../dto/shop.dto';
import { MessagePattern } from '@nestjs/microservices';

@ApiUseTags('店铺')
@Controller('shops')
export class ShopController {

    constructor(
        private readonly shopService: ShopService,
    ) { }

    @MessagePattern({ cmd: 'getOneLocation' })
    public async microGetOneLocation(dto: ShopCreateDto) {
        return this.shopService.bulkCreate(dto);
    }

    @ApiOperation({ title: '获取某个坐标附近, 所有的店铺种类数量' })
    @ApiResponse({ status: 200, type: ShopFlavorsResDto, isArray: true })
    @Get('falvors')
    public async getFlavors(
        @Query() query: ShopFlavorsQueryDto,
    ): Promise<ShopFlavorsResDto[]> {
        return this.shopService.getShopFlavors(query);
    }

}