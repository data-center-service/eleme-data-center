import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, FindOneOptions, FindManyOptions } from 'typeorm';
import { Food } from '../model/food.model';
import { IType } from '../interface/type.interface';

@Injectable()
export class FoodDao implements OnModuleInit {

    constructor(
        private readonly connection: Connection,
    ) { }

    async onModuleInit() {
        await this.connection.getMongoRepository(Food).createCollectionIndex({
            shopId: 1,
            openId: 1,
            day: -1,
        });
    }

    public async create(data: Food) {
        return this.connection.getMongoRepository(Food).insert(data);
    }

    public async bulkCreate(data: Food[]) {
        return this.connection.getMongoRepository(Food).insert(data);
    }

    public async upsert(where: Partial<Food>, data: Partial<Food>) {
        return this.connection.getMongoRepository(Food).replaceOne(where, data, {
            upsert: true,
        });
    }

    public async findAll(option: FindOneOptions<Food>) {
        return this.connection.getMongoRepository(Food).find(option);
    }

    public async findOne(option: FindOneOptions<Food>) {
        return this.connection.getMongoRepository(Food).findOne(option);
    }

    public async findAllAndCount(option: FindManyOptions<Food>) {
        return this.connection.getMongoRepository(Food).findAndCount(option);
    }

}