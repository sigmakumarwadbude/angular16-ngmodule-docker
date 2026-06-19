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
  getProduct(id: number): IProduct | undefined {
    return PRODUCTS.find((product) => product.productId === id);
  }
}
