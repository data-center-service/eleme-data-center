import { Injectable } from '@nestjs/common';
import { Connection, FindOneOptions, FindManyOptions } from 'typeorm';
import { Shop } from '../model/shop.model';
import { IType } from '../interface/type.interface';

@Injectable()
export class ShopDao {

    constructor(
        private readonly connection: Connection,
    ) { }

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

    public async findAll(option: FindOneOptions<Shop>) {
        return this.connection.getMongoRepository(Shop).find(option);
    }

    public async findOne(option: FindOneOptions<Shop>) {
        return this.connection.getMongoRepository(Shop).findOne(option);
    }

    public async findAllAndCount(option: FindManyOptions<Shop>) {
        return this.connection.getMongoRepository(Shop).findAndCount(option);
    }

}