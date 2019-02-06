import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { CronJob } from 'cron';
import { ShopService } from './service/shop.service';
import { ConfigStaticService } from './provider/config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import Eureka from 'eureka-js-client';

async function bootstrap() {

    /**
     * 启动服务
     */

    const app = await NestFactory.create(AppModule, {
        cors: false,
        bodyParser: true,
    });
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: ConfigStaticService.get('AMQP_URL'),
            queue: ConfigStaticService.get('AMQP_QUEUE'),
            queueOptions: { durable: true },
            prefetchCount: 5,
        },
    });

    app.use((req, res, next) => {
        Logger.log(req.url);
        next();
    });

    /**
     * 文档服务
     */
    if (process.env.NODE_ENV === 'dev') {
        const options = new DocumentBuilder()
            .setTitle('饿了么数据中心 [内部文档]')
            .setDescription('抓取并处理饿了么数据')
            .setVersion('1.0')
            .setBasePath('/')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs', app, document);
    } else {
        const options = new DocumentBuilder()
            .setTitle('饿了么数据中心')
            .setDescription('抓取并处理饿了么数据')
            .setVersion('1.0')
            .setBasePath('/eleme')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('docs', app, document);
    }

    /**
     * 定时计划
     */

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

    /**
     * 启动
     */

    await app.startAllMicroservicesAsync();
    await app.listenAsync(ConfigStaticService.PORT);

}

function bootstrapEureka() {
    const client = new Eureka({
        instance: {
            app: 'eleme',
            hostName: 'localhost',
            ipAddr: '127.0.0.1',
            vipAddress: '127.0.0.1',
            port: {
                '$': ConfigStaticService.PORT,
                '@enabled': true,
            },
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                'name': 'MyOwn',
            },
        },
        eureka: {
            host: ConfigStaticService.get('EUREKA_HOST'),
            port: ConfigStaticService.EUREKA_PORT,
            servicePath: '/eureka/apps/',
        },
    });

    client.logger.level('debug');
    client.start(error => {
        console.log(error || 'complete');
    });
}

bootstrap();
bootstrapEureka();
