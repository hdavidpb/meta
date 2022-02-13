import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthModule } from './month/month.module';

import * as entities from './entities';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

const listEntities = Object.values(entities);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: listEntities,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    MonthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
