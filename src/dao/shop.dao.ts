import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, FindOneOptions, FindManyOptions } from 'typeorm';
import { Shop } from '../model/shop.model';
import { IType } from '../interface/type.interface';

@Injectable()
export class ShopDao implements OnModuleInit {

    constructor(
        private readonly connection: Connection,
    ) { }

    async onModuleInit() {
        await this.connection.getMongoRepository(Shop).createCollectionIndex({
            day: -1,
            openId: 1,
        });
    }

    public async create(data: Shop) {
        return this.connection.getMongoRepository(Shop).insertOne(data);
    }

    public async bulkCreate(data: Shop[]) {
        return this.connection.getMongoRepository(Shop).insertMany(data);
    }

    public async upsert(where: Partial<Shop>, data: Partial<Shop>) {
        return this.connection.getMongoRepository(Shop).replaceOne(where, data, {
            upsert: true,
        });
    }

    public async findAll(option?: FindOneOptions<Shop>) {
        return this.connection.getMongoRepository(Shop).find(option);
    }

    public async findOne(option: FindOneOptions<Shop>) {
        return this.connection.getMongoRepository(Shop).findOne(option);
    }

    public async findAllAndCount(option: FindManyOptions<Shop>) {
        return this.connection.getMongoRepository(Shop).findAndCount(option);
    }

}