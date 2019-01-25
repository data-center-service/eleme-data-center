import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { CronJob } from 'cron';
import { ShopService } from './service/shop.service';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://hdjashdj3ufduy26623g:das32fDDSG8^&8d9)&!@7dudfggfs6ad8a2gYGUSGDiydsa89d67823du3d@47.101.132.189:5672'],
            queue: 'eleme-data-center',
            queueOptions: { durable: true },
            prefetchCount: 5,
        },
    });
    await app.listenAsync();

    const shopService = app.get(ShopService);

    new CronJob('0 0 2 * * *', async () => {
        const locations = [
            { latitude: 31.217404, longitude: 121.532286 },
            { latitude: 31.1717847814, longitude: 121.5623741547 },
        ];
        for (const location of locations) {
            await shopService.bulkCreate(location);
        }
    }, undefined, true, 'Asia/Shanghai');
}

bootstrap();
