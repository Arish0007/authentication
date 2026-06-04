import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    // This connects NestJS to your local PostgreSQL database.
    // Change "username" / "password" / "database" to match YOUR Postgres setup.
    // See the README for the exact commands to create the "myapp" database.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // your Postgres user
      password: 'postgres', // your Postgres password
      database: 'myapp', // the database name (create it first!)
      entities: [User], // tells TypeORM which tables to manage
      synchronize: true, // auto-creates the "user" table for you (fine for learning)
    }),
    AuthModule,
  ],
})
export class AppModule {}