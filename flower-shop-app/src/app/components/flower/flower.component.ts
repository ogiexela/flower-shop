import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Flower } from '../../models/flower.model';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css']
})
export class FlowerComponent implements OnInit, OnChanges {

  @Input() public flower: Flower;
  @Input() public inCart = false;
  @Output() public addToCart: EventEmitter<string> = new EventEmitter<string>();
  @Output() public removeFromCart: EventEmitter<string> = new EventEmitter<string>();

  public rating: string[] = Array(5).fill('&#9734;');
  public price: string;
  public showAddToCart = false;

  ngOnInit() {
    this.updateInfo();
  }

  ngOnChanges(): void {
   this.updateInfo();
  }

  private updateInfo(): void {
    if (!this.flower) {
      return;
    }


    this.rating = [...this.rating].fill('&#9733', 0, this.flower.rating);
    this.price = `${this.flower.price.toFixed(2)}`;
  }

  public setAddToCart(value: boolean): void {
    if (this.inCart) {
      return;
    }

    this.showAddToCart = value;
  }

  public onToCart(): void {
    this.inCart = true;
    this.showAddToCart = false;
    this.addToCart.emit(this.flower.id);
  }

  public onRemoveFromCart(): void {
    this.inCart = false;
    this.removeFromCart.emit(this.flower.id);
  }

}
