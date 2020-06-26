import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { ROOT_ROUTE } from './constants/routes/root.routes';

const routes: Routes = [
  {
    path: ROOT_ROUTE.FLOWERS,
    loadChildren: () => import('./pages/flowers/flowers.module').then(mod => mod.FlowersModule),
  },
  {
    path: '',
    redirectTo: ROOT_ROUTE.FLOWERS,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
