import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProduct } from '../models/product';
import { PRODUCTS } from '../data/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  readonly pageTitle = 'Product List';
  readonly products: ReadonlyArray<IProduct> = PRODUCTS;

  trackByProductId(index: number, product: IProduct): number {
    return product.productId;
  }
}
