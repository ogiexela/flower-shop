import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  getTestBed,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Flowers } from '../../../models/flowers.model';
import { FlowerShopService } from '../../../services/flower-shop/flower-shop.service';
import { BuyPageComponent } from './buy-page.component';
import { BuyPageModule } from './buy-page.module';

const testData: Flowers = {
  data: [],
  count: 0,
  pageCount: 0,
  total: 0,
  page: 0,
};

class MockFlowerShopServiceService {
  public getFlowers() {
    return {
      pipe: () => {
        return {
          subscribe: (next, error) => {
            next(testData);
            if (error) {
              error();
            }
          }
        };
      }
    };
  }
}

describe('BuyPageComponent', () => {

  let component: BuyPageComponent;
  let fixture: ComponentFixture<BuyPageComponent>;

  beforeEach(async(() => {
    window.alert = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [BuyPageModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        HttpClientTestingModule,
        RouterTestingModule,
        { provide: FlowerShopService, useClass: MockFlowerShopServiceService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BuyPageComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
      })
      .catch(error => console.error(error));
  }));

  it('empty state', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot('empty_state');
  });

  it('one page total', async () => {
    const testData1: Flowers = {
      data: [{
        name: 'test flower1',
        sku: 'f1',
        id: 'foooid',
        image: 'foo.jpg',
        price: 1.98,
        rating: 2,
      }],
      count: 0,
      pageCount: 0,
      total: 0,
      page: 0,
    };

    const flowerShopService: FlowerShopService = getTestBed().get(FlowerShopService);

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData1);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    await fixture.whenStable();

    expect(fixture.nativeElement).toMatchSnapshot('one_flower_state');
  });

  it('add flower to cart', async () => {
    const testData1: Flowers = {
      data: [{
        name: 'test flower1',
        sku: 'f1',
        id: 'foooid',
        image: 'foo.jpg',
        price: 1.98,
        rating: 2,
      }],
      count: 0,
      pageCount: 0,
      total: 0,
      page: 0,
    };

    const flowerShopService: FlowerShopService = getTestBed().get(FlowerShopService);

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData1);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    const firstFlower = fixture.debugElement.query(By.css(`#flower_card_${testData1.data[0].id}`));
    const mouseenter = new MouseEvent('mouseenter');
    firstFlower.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    const addToCart = firstFlower.query(By.css('#add_flower_to_cart'));
    const click = new MouseEvent('click');

    addToCart.nativeElement.dispatchEvent(click);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_in_cart_state');
  });

  it('remove flower from cart', async () => {
    const testData1: Flowers = {
      data: [{
        name: 'test flower1',
        sku: 'f1',
        id: 'foooid',
        image: 'foo.jpg',
        price: 1.98,
        rating: 2,
      }],
      count: 0,
      pageCount: 0,
      total: 0,
      page: 0,
    };

    const flowerShopService: FlowerShopService = getTestBed().get(FlowerShopService);

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData1);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    fixture.componentInstance.cart = [testData1.data[0].id];

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('flower_in_cart_state');

    const firstFlower = fixture.debugElement.query(By.css(`#flower_card_${testData1.data[0].id}`));

    const mouseenter = new MouseEvent('mouseenter');
    firstFlower.nativeElement.dispatchEvent(mouseenter);

    fixture.detectChanges();

    const removeFromCart = firstFlower.query(By.css('#remove_flower_from_cart'));
    const click = new MouseEvent('click');

    removeFromCart.nativeElement.dispatchEvent(click);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('cart_empty_state');
  });

  it('next and previous pages of flowers', async () => {
    const testData1: Flowers = {
      data: [
        {
          name: 'test flower1',
          sku: 'f1',
          id: 'foooid1',
          image: 'foo1.jpg',
          price: 1.98,
          rating: 2,
        },
        {
          name: 'test flower2',
          sku: 'f2',
          id: 'foooid2',
          image: 'foo2.jpg',
          price: 2.22,
          rating: 4,
        },
      ],
      count: 1,
      pageCount: 2,
      total: 2,
      page: 1,
    };

    const testData2: Flowers = {
      data: [
        {
          name: 'test flower2',
          sku: 'f2',
          id: 'foooid2',
          image: 'foo2.jpg',
          price: 2.22,
          rating: 4,
        },
      ],
      count: 1,
      pageCount: 2,
      total: 2,
      page: 2,
    };

    const flowerShopService: FlowerShopService = getTestBed().get(FlowerShopService);

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData1);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    fixture.componentInstance.currentPage = 1;
    fixture.componentInstance.itemsPerPage = 1;

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('first_page');

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData2);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    const nextPageButton = fixture.debugElement.query(By.css('#next_page'));
    const click = new MouseEvent('click');

    nextPageButton.nativeElement.dispatchEvent(click);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('next_page');

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData1);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    const previousPageButton = fixture.debugElement.query(By.css('#previous_page'));

    previousPageButton.nativeElement.dispatchEvent(click);

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot('previous_page');
  });


  it('change items per page', async () => {
    const testData1: Flowers = {
      data: [
        {
          name: 'test flower1',
          sku: 'f1',
          id: 'foooid1',
          image: 'foo1.jpg',
          price: 1.98,
          rating: 2,
        },
        {
          name: 'test flower2',
          sku: 'f2',
          id: 'foooid2',
          image: 'foo2.jpg',
          price: 2.22,
          rating: 4,
        },
      ],
      count: 1,
      pageCount: 2,
      total: 2,
      page: 1,
    };

    const flowerShopService: FlowerShopService = getTestBed().get(FlowerShopService);

    flowerShopService.getFlowers = jest.fn().mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (next, error) => {
              next(testData1);
              if (error) {
                error();
              }
            }
          };
        }
      };
    });

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    const itemsPerPage: HTMLSelectElement = fixture.debugElement.query(By.css('#itemsPerPage')).nativeElement;
    itemsPerPage.selectedIndex = 1;

    itemsPerPage.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    await fixture.whenStable();

    expect(flowerShopService.getFlowers).toHaveBeenCalledWith(1, 0, 5);
  });
});
