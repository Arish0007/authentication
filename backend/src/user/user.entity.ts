import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;           // auto number: 1, 2, 3...

  @Column()
  name: string;         // user's name

  @Column({ unique: true })
  email: string;        // must be unique (no two same emails)

  @Column()
  password: string;     // will be stored encrypted
}