import { Injectable } from '@nestjs/common';
import { Connection, FindOneOptions, FindManyOptions } from 'typeorm';
import { Menu } from '../model/menu.model';
import { IType } from '../interface/type.interface';

@Injectable()
export class MenuDao {

    constructor(
        private readonly connection: Connection,
    ) { }

    public async create(data: Menu) {
        return this.connection.getMongoRepository(Menu).insert(data);
    }

    public async bulkCreate(data: Menu[]) {
        return this.connection.getMongoRepository(Menu).insert(data);
    }

    public async upsert(where: Partial<Menu>, data: Partial<Menu>) {
        return this.connection.getMongoRepository(Menu).replaceOne(where, data, {
            upsert: true,
        });
    }

    public async findAll(option: FindOneOptions<Menu>) {
        return this.connection.getMongoRepository(Menu).find(option);
    }

    public async findOne(option: FindOneOptions<Menu>) {
        return this.connection.getMongoRepository(Menu).findOne(option);
    }

    public async findAllAndCount(option: FindManyOptions<Menu>) {
        return this.connection.getMongoRepository(Menu).findAndCount(option);
    }

}