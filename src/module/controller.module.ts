import { Module } from '@nestjs/common';
import { ServiceModule } from './service.module';
import { ShopController } from '../controller/shop.controller';

@Module({
  imports: [ServiceModule],
  controllers: [ShopController],
})
export class ControllerModule { }
