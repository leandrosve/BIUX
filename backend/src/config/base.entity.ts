import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type:'timestamp',
    name:'created_at'
  })
  createdAt:Date;
  @UpdateDateColumn({
    type:'timestamp',
    name:'updated_at'
  })
  updatedAt:Date;
}