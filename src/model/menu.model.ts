import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Menu {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    shopId: string;

    @Column()
    openId: number;

    @Column()
    name: string;

    @Column()
    day: string;

    @Column('json')
    data: any;

}