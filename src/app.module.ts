import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthModule } from './month/month.module';

import * as entities from './entities';
const listEntities = Object.values(entities);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1214',
      database: 'postgres',
      entities: listEntities,
      synchronize: true,
    }),
    AuthModule,
    MonthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
