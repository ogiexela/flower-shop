import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlowerModule } from '../../../components/flower/flower.module';
import { BuyPageComponent } from './buy-page.component';

@NgModule({
  declarations: [
    BuyPageComponent,
  ],
  imports: [
    CommonModule,
    FlowerModule,
    FormsModule,
    RouterModule,
  ]
})
export class BuyPageModule { }
