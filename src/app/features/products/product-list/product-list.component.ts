import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { PRODUCTS } from '../data/products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  readonly pageTitle = 'Product List';
  protected products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  trackByProductId(index: number, product: IProduct): number {
    return product.productId;
  }
}
