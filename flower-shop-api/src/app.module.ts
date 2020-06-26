import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowerModule } from './flower/flower.module';

const CONNECTION_STRING = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres";
const EXTRA: any = {};

if (process.env.DATABASE_URL) {
  EXTRA.ssl = true;
  EXTRA.extra = {
    ssl: {
      rejectUnauthorized: false
    },
  }
}

const DB_CONNECTION_META: ConnectionOptions = {
  type: 'postgres',
  url: CONNECTION_STRING,
  entities: [
    './api/**/*.entity.js',
  ],
  synchronize: true,
  ...EXTRA,
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname),
    }),
    TypeOrmModule.forRoot(DB_CONNECTION_META),
    FlowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
