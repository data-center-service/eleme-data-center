import { Controller } from '@nestjs/common';
import { ShopService } from '../service/shop.service';
import { ShopCreateDto } from '../dto/shop.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('shops')
export class ShopController {

    constructor(
        private readonly shopService: ShopService,
    ) { }

    @MessagePattern({ cmd: 'getOneLocation' })
    public async microGetOneLocation(dto: ShopCreateDto) {
        return this.shopService.bulkCreate(dto);
    }

}