import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tenant{

    @PrimaryGeneratedColumn("uuid")
    id!: String;

    @Column()
    @Index({unique:true})
    name!:String;

    @Column({nullable:true})
    label!:String;

    @Column({name:"created_at"})
    createdAt!:Date;

    @Column({name:"updated_at"})
    updatedAt!:Date;
    
   
}