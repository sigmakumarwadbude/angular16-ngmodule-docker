# Milestone 06: HTTP Client Integration

## Overview

Until now, product data was loaded from a local TypeScript data source through the ProductService.

This milestone introduces Angular's HttpClient and RxJS Observables to load product data asynchronously from a JSON file located in the assets folder.

The ProductService is refactored to use HttpClient, return Observables, and centralize error handling. Product List and Product Detail components are updated to consume asynchronous data streams.

This milestone also introduces Angular's OnPush Change Detection Strategy and ChangeDetectorRef to improve application performance.

---

## Objectives

* Configure Angular HttpClient
* Load data from JSON using HTTP
* Understand RxJS Observables
* Introduce RxJS operators
* Implement centralized error handling
* Load Product List data asynchronously
* Load Product Detail data asynchronously
* Learn OnPush Change Detection
* Use ChangeDetectorRef
* Prepare for backend API integration

---

## Git Information

### Branch

```bash
feature/http-client
```

### Tag

```bash
v0.6-http-client
```

---

## Project Structure

```text
src/
├── app/
│   ├── shared/
│   │   └── star/
│   │
│   ├── features/
│   │   └── products/
│   │       ├── product-list/
│   │       │   ├── product-list.component.ts
│   │       │   ├── product-list.component.html
│   │       │   └── product-list.component.spec.ts
│   │       │
│   │       ├── product-detail/
│   │       │   ├── product-detail.component.ts
│   │       │   ├── product-detail.component.html
│   │       │   └── product-detail.component.spec.ts
│   │       │
│   │       ├── models/
│   │       │   └── product.ts
│   │       │
│   │       ├── services/
│   │       │   ├── product.service.ts
│   │       │   └── product.service.spec.ts
│   │       │
│   │       └── data/
│   │
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
│
├── assets/
│   └── products/
│       └── products.json
│
├── styles.scss
└── main.ts
```

---

## Step 1: Create Product JSON File

### assets/products/products.json

```json
[
  {
    "productId": 1,
    "productName": "Leaf Rake",
    "productCode": "GDN-0011",
    "releaseDate": "March 19, 2024",
    "price": 19.95,
    "description": "Leaf rake with wooden handle.",
    "starRating": 3.5,
    "imageUrl": "assets/images/leaf_rake.png"
  }
]
```

---

## Step 2: Configure HttpClientModule

### app.module.ts

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ]
})
export class AppModule {}
```

---

## Step 3: Refactor Product Service

### services/product.service.ts

```ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import {
  Observable,
  throwError
} from 'rxjs';

import {
  catchError,
  map
} from 'rxjs/operators';

import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl =
    'assets/products/products.json';

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<IProduct[]> {

    return this.http
      .get<IProduct[]>(this.productUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(
    id: number
  ): Observable<IProduct | undefined> {

    return this.getProducts().pipe(
      map(
        (products: IProduct[]) =>
          products.find(
            p => p.productId === id
          )
      )
    );
  }

  private handleError(
    err: HttpErrorResponse
  ): Observable<never> {

    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage =
        `An error occurred: ${err.error.message}`;
    } else {
      errorMessage =
        `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);

    return throwError(
      () => errorMessage
    );
  }
}
```

---

## Step 4: Update Product List Component

### product-list.component.ts

```ts
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class ProductListComponent
  implements OnInit {

  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.productService
      .getProducts()
      .subscribe({
        next: products => {
          this.products = products;
          this.cdr.markForCheck();
        }
      });
  }
}
```

---

## Step 5: Update Product Detail Component

### product-detail.component.ts

```ts
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl:
    './product-detail.component.html',
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {

  product?: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.productService
      .getProduct(id)
      .subscribe({
        next: product => {
          this.product = product;
          this.cdr.markForCheck();
        }
      });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
```

---

## Angular Concepts Learned

### HttpClient

Angular's built-in service for HTTP communication.

```ts
this.http.get<IProduct[]>(
  this.productUrl
);
```

Benefits:

* Strongly typed responses
* RxJS integration
* Error handling support
* Interceptors support

---

### Observable

Represents asynchronous streams of data.

```ts
Observable<IProduct[]>
```

Benefits:

* Async operations
* Lazy execution
* Reactive programming
* Stream transformations

---

### RxJS map Operator

Transforms Observable data.

```ts
map(products =>
  products.find(
    p => p.productId === id
  )
)
```

Used to locate a specific product from the collection.

---

### RxJS catchError Operator

Centralizes error handling.

```ts
catchError(
  this.handleError
)
```

Benefits:

* Reusable
* Consistent error processing
* Cleaner components

---

### HttpErrorResponse

Provides detailed HTTP error information.

```ts
private handleError(
  err: HttpErrorResponse
)
```

Handles:

* Network failures
* Server errors
* Invalid responses

---

### OnPush Change Detection

```ts
changeDetection:
  ChangeDetectionStrategy.OnPush
```

Benefits:

* Better performance
* Fewer change detection cycles
* Enterprise Angular best practice

---

### ChangeDetectorRef

Used because HTTP subscriptions complete asynchronously.

```ts
this.cdr.markForCheck();
```

Ensures Angular updates the UI after data is received.

---

## Architecture Evolution

### Before

```text
products.ts
      │
      ▼
ProductService
      │
      ▼
Product Components
```

### After

```text
products.json
      │
      ▼
HttpClient
      │
      ▼
ProductService
      │
      ├── getProducts()
      │
      └── getProduct(id)
      │
      ▼
Observable Streams
      │
      ▼
Product Components
```

---

## Validation Checklist

* [ ] HttpClientModule configured
* [ ] products.json created
* [ ] ProductService uses HttpClient
* [ ] ProductService returns Observable<IProduct[]>
* [ ] ProductService returns Observable<IProduct | undefined>
* [ ] Product List loads data via HTTP
* [ ] Product Detail loads data via HTTP
* [ ] RxJS map operator implemented
* [ ] RxJS catchError implemented
* [ ] HttpErrorResponse handling implemented
* [ ] OnPush enabled
* [ ] markForCheck() implemented
* [ ] Application builds successfully
* [ ] Unit tests pass

---

## Commit History

### Commit 1

```bash
git commit -m "feat: implement HttpClient for product data retrieval and add mock product data"
```

---

## Pull Request

### Title

```text
feat(products): integrate HttpClient and RxJS observables
```

### Description

* Added HttpClientModule
* Created products.json data source
* Replaced static data with HTTP requests
* Introduced RxJS Observables
* Added product lookup using map operator
* Added centralized error handling
* Updated Product Detail to use HTTP
* Enabled OnPush Change Detection
* Added ChangeDetectorRef support
* Prepared application for REST API integration

---

## Milestone Progress

```text
✅ Milestone 0 - Angular 16 + Docker + Tailwind Setup
✅ Milestone 1 - Product List
✅ Milestone 2 - Product Service
✅ Milestone 3 - Product Detail
✅ Milestone 4 - Product Filter
✅ Milestone 5 - Star Component
✅ Milestone 6 - HTTP Client Integration
⬜ Milestone 7 - Lazy Loaded Product Module
```

---

## Next Milestone

### Milestone 07: Lazy Loaded Product Module

Upcoming topics:

* Feature Modules
* ProductModule
* Routing Modules
* loadChildren
* Angular Router Optimization
* Bundle Splitting
* Lazy Loading
* Application Scalability
