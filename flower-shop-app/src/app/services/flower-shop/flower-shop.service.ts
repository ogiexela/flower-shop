import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
} from '@angular/core';
import { Flower } from '../../models/flower.model';
import { Flowers } from '../../models/flowers.model';

@Injectable({
  providedIn: 'root'
})
export class FlowerShopService {

  private readonly API_URL = '/api';

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  public getFlowers(page: number = 1, offset: number = 0, limit: number = 25) {
    return this.http.get<Flowers>(`${this.API_URL}/flower?limit=${limit}&offset=${offset}&page=${page}`);
  }

  public createFlower(flower: Flower) {
    return this.http.post<Flower>(`${this.API_URL}/flower`, flower);
  }
}
