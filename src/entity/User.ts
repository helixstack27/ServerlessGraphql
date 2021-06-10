import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Tenant } from "./Tenant";

@Entity()
export class Users{

    @PrimaryGeneratedColumn("uuid")
    id!:String;

    @ManyToOne(type => Tenant)
    @JoinColumn({name: 'tenant_id', referencedColumnName: 'id'})
    tenant!: Tenant;

    @Column()
    email!: String;

    @Column({name:"first_name"})
    firstName!: String;

    @Column({name:"last_name"})
    lastName!: String;

    @Column({name:"created_at"})
    createdAt!: Date;

    @Column({name:"updated_at"})
    updatedAt!: Date;


}