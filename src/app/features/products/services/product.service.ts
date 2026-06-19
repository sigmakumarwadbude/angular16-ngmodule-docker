import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(): IProduct[] {
    return PRODUCTS;
  }
}
