import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { CronJob } from 'cron';
import { ShopService } from './service/shop.service';
import { ConfigStaticService } from './provider/config/config.service';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ConfigStaticService.get('AMQP_URL'),
            queue: ConfigStaticService.get('AMQP_QUEUE'),
            queueOptions: { durable: true },
            prefetchCount: 5,
        },
    });
    await app.listenAsync();

    const shopService = app.get(ShopService);

    new CronJob(ConfigStaticService.get('CRON'), async () => {
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
