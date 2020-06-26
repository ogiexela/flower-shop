import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { FLOWER_ROUTE } from '../../constants/routes/flower.routes';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { BuyPageModule } from './buy-page/buy-page.module';
import { SellPageComponent } from './sell-page/sell-page.component';
import { SellPageModule } from './sell-page/sell-page.module';

const routes: Routes = [
  {
    path: FLOWER_ROUTE.BUY,
    component: BuyPageComponent,
  },
  {
    path: FLOWER_ROUTE.SELL,
    component: SellPageComponent
  },
  {
    path: '',
    redirectTo: FLOWER_ROUTE.BUY,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    BuyPageModule,
    SellPageModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class FlowersRoutingModule { }
