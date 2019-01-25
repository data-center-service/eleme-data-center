import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Shop {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    openId: number;

    @Column()
    name: string;

    @Column()
    day: string;

    @Column('json')
    data: any;

}