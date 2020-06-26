import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FlowerShopService } from '../../../services/flower-shop/flower-shop.service';
import { SellPageComponent } from './sell-page.component';
import { SellPageModule } from './sell-page.module';

class MockFlowerShopServiceService {
  public createFlower(newFlower) {
    return {
      pipe: () => {
        return {
          subscribe: (next, error) => {
            next(newFlower);
            error();
          }
        };
      }
    };
  }
}

describe('SellPageComponent', () => {
  let component: SellPageComponent;
  let fixture: ComponentFixture<SellPageComponent>;

  beforeEach(async(() => {
    window.alert = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [SellPageModule, HttpClientTestingModule],
      providers: [
        HttpClientTestingModule,
        { provide: FlowerShopService, useClass: MockFlowerShopServiceService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SellPageComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
      })
      .catch(error => console.error(error));
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot('empty_state');
  });

  it('submit button is disabled when form is invalid', () => {
    fixture.detectChanges();

    component.onSubmit = jest.fn();

    const submitButton = fixture.debugElement.query(By.css('#submit_flower'));
    submitButton.nativeElement.click();

    expect(component.onSubmit).toBeCalledTimes(0);
  });

  it('able to clear form', () => {
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const flowerSkuInput: HTMLInputElement = hostElement.querySelector('#flowerSku');
    const flowerName: HTMLInputElement = hostElement.querySelector('#flowerName');
    const flowerImage: HTMLInputElement = hostElement.querySelector('#flowerImage');
    const flowerPrice: HTMLInputElement = hostElement.querySelector('#flowerPrice');
    const flowerRating: HTMLInputElement = hostElement.querySelector('#flowerRating');

    const testData = {
      sku: 'f1',
      name: 'flower1',
      image: 'flower_f1.jpg',
      price: '4.99',
      rating: '3',
    };

    flowerSkuInput.value = testData.sku;
    flowerSkuInput.dispatchEvent(new Event('input'));

    flowerName.value = testData.name;
    flowerName.dispatchEvent(new Event('input'));

    flowerImage.value = testData.image;
    flowerImage.dispatchEvent(new Event('input'));

    flowerPrice.value = testData.price;
    flowerPrice.dispatchEvent(new Event('input'));

    flowerRating.value = testData.rating;
    flowerRating.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('full_form_valid_state');

    expect(flowerSkuInput.value).toBe(testData.sku);
    expect(flowerName.value).toBe(testData.name);
    expect(flowerImage.value).toBe(testData.image);
    expect(flowerPrice.value).toBe(testData.price);
    expect(flowerRating.value).toBe(testData.rating);

    const resetButton = fixture.debugElement.query(By.css('#reset_flower'));
    resetButton.nativeElement.click();

    fixture.detectChanges();

    expect(flowerSkuInput.value).toBe('');
    expect(flowerName.value).toBe('');
    expect(flowerImage.value).toBe('');
    expect(flowerPrice.value).toBe('');
    expect(flowerRating.value).toBe('');

    expect(fixture.nativeElement).toMatchSnapshot('empy_form_invalid_state');
  });

  it('able to submit valid form', () => {
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const flowerSkuInput: HTMLInputElement = hostElement.querySelector('#flowerSku');
    const flowerName: HTMLInputElement = hostElement.querySelector('#flowerName');
    const flowerImage: HTMLInputElement = hostElement.querySelector('#flowerImage');
    const flowerPrice: HTMLInputElement = hostElement.querySelector('#flowerPrice');
    const flowerRating: HTMLInputElement = hostElement.querySelector('#flowerRating');

    const testData = {
      sku: 'f1',
      name: 'flower1',
      image: 'flower_f1.jpg',
      price: '4.99',
      rating: '3',
    };

    flowerSkuInput.value = testData.sku;
    flowerSkuInput.dispatchEvent(new Event('input'));

    flowerName.value = testData.name;
    flowerName.dispatchEvent(new Event('input'));

    flowerImage.value = testData.image;
    flowerImage.dispatchEvent(new Event('input'));

    flowerPrice.value = testData.price;
    flowerPrice.dispatchEvent(new Event('input'));

    flowerRating.value = testData.rating;
    flowerRating.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const flowerShopService = TestBed.get(FlowerShopService);

    const createFlowerSpy = jest.spyOn(flowerShopService, 'createFlower');

    const submitButton = fixture.debugElement.query(By.css('#submit_flower'));
    submitButton.nativeElement.click();

    expect(createFlowerSpy.mock.calls).toMatchSnapshot('create_flower_call');

  });

  it('form is cleared after flower is created', async () => {
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const flowerSkuInput: HTMLInputElement = hostElement.querySelector('#flowerSku');
    const flowerName: HTMLInputElement = hostElement.querySelector('#flowerName');
    const flowerImage: HTMLInputElement = hostElement.querySelector('#flowerImage');
    const flowerPrice: HTMLInputElement = hostElement.querySelector('#flowerPrice');
    const flowerRating: HTMLInputElement = hostElement.querySelector('#flowerRating');

    const testData = {
      sku: 'f1',
      name: 'flower1',
      image: 'flower_f1.jpg',
      price: '4.99',
      rating: '3',
    };

    flowerSkuInput.value = testData.sku;
    flowerSkuInput.dispatchEvent(new Event('input'));

    flowerName.value = testData.name;
    flowerName.dispatchEvent(new Event('input'));

    flowerImage.value = testData.image;
    flowerImage.dispatchEvent(new Event('input'));

    flowerPrice.value = testData.price;
    flowerPrice.dispatchEvent(new Event('input'));

    flowerRating.value = testData.rating;
    flowerRating.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const flowerShopService = TestBed.get(FlowerShopService);

    const createFlowerSpy = jest.spyOn(flowerShopService, 'createFlower');

    const alertSpy = jest.spyOn(window, 'alert');

    const submitButton = fixture.debugElement.query(By.css('#submit_flower'));
    submitButton.nativeElement.click();

    fixture.detectChanges();

    await fixture.whenStable();

    expect(flowerSkuInput.value).toBe('');
    expect(flowerName.value).toBe('');
    expect(flowerImage.value).toBe('');
    expect(flowerPrice.value).toBe('');
    expect(flowerRating.value).toBe('');

    expect(createFlowerSpy.mock.calls).toMatchSnapshot('create_flower_call');
    expect(alertSpy.mock.calls).toMatchSnapshot('alert_calls');
    expect(fixture.nativeElement).toMatchSnapshot('empy_form_invalid_state');
  });
});
