import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowerController } from './flower.controller';
import { FlowerEntity } from './flower.entity';
import { FlowerService } from './flower.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlowerEntity])],
  controllers: [FlowerController],
  providers: [FlowerService]
})
export class FlowerModule { }