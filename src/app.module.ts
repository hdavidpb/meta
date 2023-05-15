import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { TaskModule } from './task/task.module';

const listEntities = Object.values(entities);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'root',
      password: 'root',
      database: 'domina_db_dev',
      entities: listEntities,
      synchronize: true,
    }),
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
