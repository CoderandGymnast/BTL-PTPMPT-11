import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Film{
    @PrimaryGeneratedColumn()
    id:number;
    @ApiProperty()
    @Column()
    film:string;
    @ApiProperty()
    @Column()
    description:string;
    @ApiProperty()
    @Column()
    category:string;
    @ApiProperty()
    @Column()
    cast:string;
    @ApiProperty()
    @Column()
    thumbnail:string;

}