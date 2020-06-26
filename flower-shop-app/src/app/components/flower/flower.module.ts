import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlowerComponent } from './flower.component';

@NgModule({
  declarations: [FlowerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FlowerComponent,
  ]
})
export class FlowerModule { }
