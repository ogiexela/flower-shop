import { take } from 'rxjs/operators';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Flower } from '../../../models/flower.model';
import { Flowers } from '../../../models/flowers.model';
import { FlowerShopService } from '../../../services/flower-shop/flower-shop.service';

@Component({
  selector: 'app-buy-page',
  styleUrls: ['./buy-page.component.css'],
  templateUrl: './buy-page.component.html',
})
export class BuyPageComponent implements OnInit {

  public cart = [];
  public allFlowers: Set<Flower> = new Set<Flower>();
  public flowers: Flower[] = [];
  public flowersResponse: Flowers;
  public currentPage = 1;
  public itemsPerPage = 10;

  constructor(
    @Inject(FlowerShopService) private readonly flowerShopService: FlowerShopService,
  ) { }

  ngOnInit() {
    this.getFlowers();
  }

  public nextPage(): void {
    this.currentPage += 1;
    this.getFlowers();
  }

  public previousPage(): void {
    this.currentPage -= 1;
    this.getFlowers();
  }

  public changeItemsPerPage(count: number): void {
    this.itemsPerPage = count;
    this.currentPage = 1;
    this.getFlowers();
  }

  private getFlowers(): void {
    this.flowerShopService
      .getFlowers(+this.currentPage, 0, +this.itemsPerPage)
      .pipe(take(1))
      .subscribe((flowers: Flowers) => {
        this.flowersResponse = flowers;
        this.flowers = flowers.data;
        this.flowers.forEach((flower) => this.allFlowers.add(flower));
      });
  }

  public isInCart(id: string): boolean {
    return this.cart.includes(id);
  }

  public get shouldShowPreviousPageButton(): boolean {
    return this.currentPage > 1;
  }

  public get shouldShowNextPageButton(): boolean {
    return this.currentPage < this.flowersResponse.pageCount;
  }

  public getFlowerName(flowerId: string): string {
    return [...this.allFlowers].find((flower) => flower.id === flowerId).name;
  }

  public addToCart(flowerId: string): void {
    this.cart = this.cart.concat([flowerId]);
  }

  public removeFromCart(flowerId: string): void {
    this.cart = this.cart.filter((id) => id !== flowerId);
  }

}
