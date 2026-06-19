import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product';

export const mockProduct: IProduct = {
  productId: 1,
  productName: 'Leaf Rake',
  productCode: 'GDN-0011',
  releaseDate: 'March 19, 2021',
  description: 'Leaf rake with 48-inch wooden handle.',
  price: 19.95,
  starRating: 3.2,
  imageUrl: 'assets/images/leaf_rake.png'
};

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        {
          provide: ProductService,
          useValue: {
            getProduct: () => mockProduct,
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the product on init', () => {
    expect(component.product).toEqual(mockProduct);
  });

  it('should set pageTitle to Product Detail', () => {
    expect(component.pageTitle).toBe('Product Detail');
  });
});
