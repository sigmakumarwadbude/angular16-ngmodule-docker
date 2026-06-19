import { Component } from '@angular/core';
import { IProduct } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  product?: IProduct;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProduct(id);
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
