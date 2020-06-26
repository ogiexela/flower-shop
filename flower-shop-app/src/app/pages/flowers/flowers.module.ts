import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlowerModule } from '../../components/flower/flower.module';
import { FlowersRoutingModule } from './flowers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlowerModule,
    FlowersRoutingModule,
  ]
})
export class FlowersModule { }
