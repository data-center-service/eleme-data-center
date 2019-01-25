import { HttpModule, Module } from '@nestjs/common';
import { ElemeServer } from '../server/eleme.server';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        ElemeServer,
    ],
    exports: [
        ElemeServer,
    ],
})
export class ServerModule { }
