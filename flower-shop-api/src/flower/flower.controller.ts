import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { FlowerEntity } from './flower.entity';
import { FlowerService } from './flower.service';

@Crud({
  model: {
    type: FlowerEntity
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})
@Controller('flower')
@ApiTags('flower')
export class FlowerController {
  constructor(public service: FlowerService) { }
}