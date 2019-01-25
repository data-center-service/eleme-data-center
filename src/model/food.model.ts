import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Food {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    openId: number;

    @Column()
    shopId: string;

    @Column()
    name: string;

    @Column()
    day: string;

    @Column('json')
    data: any;

}