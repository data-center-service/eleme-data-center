import { Module } from '@nestjs/common';
import { ServiceModule } from './service.module';
import { ShopController } from '../controller/shop.controller';
import { OutputController } from '../controller/output.controller';

@Module({
  imports: [ServiceModule],
  controllers: [ShopController, OutputController],
})
export class ControllerModule { }
