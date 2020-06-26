import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FlowerEntity } from './flower.entity';

@Injectable()
export class FlowerService extends TypeOrmCrudService<FlowerEntity> {
  constructor(@InjectRepository(FlowerEntity) repo: Repository<FlowerEntity>) {
    super(repo)
  }
}