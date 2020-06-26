import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Flowers } from '../../models/flowers.model';
import { FlowerShopService } from './flower-shop.service';

describe('FlowerShopService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: FlowerShopService = TestBed.get(FlowerShopService);
    expect(service).toBeTruthy();
  });

  it('should call createFlower api', () => {
    const service: FlowerShopService = TestBed.get(FlowerShopService);
    httpMock = TestBed.get(HttpTestingController);

    service.createFlower({ name: 'original flower name' }).subscribe((createdFlower) => {
      expect(createdFlower).toMatchSnapshot('create flower api response');
    });



    const request = httpMock.expectOne('/api/flower');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toMatchSnapshot('create flower api call body');

    request.flush({ name: 'created flower name' });

    httpMock.verify();
  });

  it('should call getFlowers api with default args', () => {
    const service: FlowerShopService = TestBed.get(FlowerShopService);
    httpMock = TestBed.get(HttpTestingController);

    service.getFlowers().subscribe((flowers: Flowers) => {
      expect(flowers).toMatchSnapshot('get flowers api response');
    });


    const request = httpMock.expectOne(`/api/flower?limit=${25}&offset=${0}&page=${1}`);

    expect(request.request.method).toBe('GET');
    expect(request.request.params).toMatchSnapshot('get flower api call params');

    request.flush({
      count: 1,
      data: [ {name: 'dummy flower'}],
      page: 1,
      pageCount: 1,
      total: 1,
    });

    httpMock.verify();
  });
});
