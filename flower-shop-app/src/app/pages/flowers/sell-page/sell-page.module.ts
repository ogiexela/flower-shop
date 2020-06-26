import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowerModule } from '../../../components/flower/flower.module';
import { SellPageComponent } from './sell-page.component';

@NgModule({
  declarations: [
      SellPageComponent,
  ],
  imports: [
    CommonModule,
    FlowerModule,
    FormsModule
  ]
})
export class SellPageModule { }
