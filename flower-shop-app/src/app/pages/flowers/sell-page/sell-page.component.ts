import { take } from 'rxjs/operators';
import {
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import { Flower } from '../../../models/flower.model';
import { FlowerShopService } from '../../../services/flower-shop/flower-shop.service';

@Component({
  selector: 'app-sell-page',
  styleUrls: ['./sell-page.component.css'],
  templateUrl: './sell-page.component.html',
})
export class SellPageComponent {

  @ViewChild('flowerForm', { static: true}) private form: HTMLFormElement;
  public newFlower: Flower = {};

  constructor(
    @Inject(FlowerShopService) private readonly flowerShopServer: FlowerShopService,
  ) { }

  public onSubmit(): void {
    this.flowerShopServer
      .createFlower(this.newFlower).pipe(take(1))
      .subscribe(
        (createdFlower) => {
          alert(`Created new flower '${createdFlower.name}'.`);
          this.newFlower = {};
          this.form.reset();
        },
        () => {
          alert('Failed to create new flower.');
        });
  }

  public clearFlower(): void {
    this.newFlower = {};
  }

}
