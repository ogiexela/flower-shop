import { Component } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Flower } from '../../models/flower.model';
import { FlowerModule } from './flower.module';

@Component({
  template: `
    <app-flower
      (addToCart)="addToCart($event)"
      (removeFromCart)="removeFromCart($event)"
      [flower]="flower"
      [inCart]="inCart"
    ></app-flower>`
})
class TestHostComponent {
  public flower: Flower;
  public inCart = false;
  public addToCart(): void {}
  public removeFromCart(): void {}
}

describe('FlowerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlowerModule,
      ],
      declarations: [TestHostComponent],
      providers: [],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
      })
      .catch(error => console.error(error));
  }));

  it('state without a flower', () => {
    expect(fixture.nativeElement).toMatchSnapshot('empty_state');
  });

  it('state with a flower', async () => {
    fixture.componentInstance.flower = {
      name: 'Test Flower1',
      id: 'fooid',
      image: 'flower1.jpg',
      price: 4.99,
      rating: 2,
      sku: 'tf1',
    };

    fixture.detectChanges();

    await fixture.whenRenderingDone();

    expect(fixture.nativeElement).toMatchSnapshot('flower_state');
  });

  it('display add to cart on mouse enter', async () => {
    fixture.componentInstance.flower = {
      id: 'fooid',
      image: 'flower2.jpg',
      name: 'Test Flower2',
      price: 4.99,
      rating: 3,
      sku: 'tf1',
    };

    fixture.detectChanges();

    const flowerCard = fixture.debugElement.query(By.css('.flower-card'));
    const mouseenter = new MouseEvent('mouseenter');
    flowerCard.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_add_to_cart');
  });

  it('do not display add to cart on mouse leave', async () => {
    fixture.componentInstance.flower = {
      id: 'fooid',
      image: 'flower3.jpg',
      name: 'Test Flower3',
      price: 5.99,
      rating: 1,
      sku: 'tf3',
    };

    fixture.detectChanges();

    const flowerCard = fixture.debugElement.query(By.css('.flower-card'));
    const mouseenter = new MouseEvent('mouseenter');
    flowerCard.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_add_to_cart_on');

    const mouseleave = new MouseEvent('mouseleave');
    flowerCard.nativeElement.dispatchEvent(mouseleave);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_add_to_cart_off');
  });

  it('able to add to cart', async () => {
    const testFlower: Flower = {
      id: 'foo_id1',
      name: 'Test Flower4',
      image: 'flower4.jpg',
      sku: 'tf4',
      price: 5.99,
      rating: 4,
    };

    fixture.componentInstance.flower = testFlower;

    fixture.detectChanges();

    const flowerCard = fixture.debugElement.query(By.css('.flower-card'));
    const mouseenter = new MouseEvent('mouseenter');
    flowerCard.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    const addToCartSpy = jest.spyOn(fixture.componentInstance, 'addToCart');

    const addToCart = fixture.debugElement.query(By.css('#add_flower_to_cart'));
    const click = new MouseEvent('click');
    addToCart.nativeElement.dispatchEvent(click);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_added_to_cart');

    expect(addToCartSpy).toBeCalledWith(testFlower.id);

    addToCartSpy.mockClear();
  });

  it('able to remove from cart', async () => {
    const testFlower: Flower = {
      id: 'foo_id2',
      name: 'Test Flower5',
      image: 'flower5.jpg',
      sku: 'tf5',
      price: 6.99,
      rating: 5,
    };
    fixture.componentInstance.inCart = true;
    fixture.componentInstance.flower = testFlower;

    fixture.detectChanges();

    const removeFromCartSpy = jest.spyOn(fixture.componentInstance, 'removeFromCart');

    const removeFromCart = fixture.debugElement.query(By.css('#remove_flower_from_cart'));
    const click = new MouseEvent('click');

    removeFromCart.nativeElement.dispatchEvent(click);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_added_to_cart_false');

    expect(removeFromCartSpy).toBeCalledWith(testFlower.id);

    removeFromCartSpy.mockClear();
  });

  it('flower already in cart', async () => {
    fixture.componentInstance.inCart = true;
    fixture.componentInstance.flower = {
      id: 'fooid',
      image: 'flower7.jpg',
      name: 'Test Flower7',
      price: 7.99,
      rating: 3,
      sku: 'tf7',
    };

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_already_in_cart');

    const flowerCard = fixture.debugElement.query(By.css('.flower-card'));
    const mouseenter = new MouseEvent('mouseenter');
    flowerCard.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_already_in_cart');
  });
});
