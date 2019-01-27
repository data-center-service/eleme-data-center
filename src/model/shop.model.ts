import { Entity, ObjectID, ObjectIdColumn, Column, Index } from 'typeorm';

@Entity()
export class Shop {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    openId: string;

    @Column()
    name: string;

    @Column()
    day: string;

    @Column('json')
    data: any;

}