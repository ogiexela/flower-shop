import { Flower } from './flower.model';

export interface Flowers {
    count: number;
    data: Flower[];
    page: number;
    pageCount: number;
    total: number;
}
