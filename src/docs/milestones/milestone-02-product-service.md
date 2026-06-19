# Milestone 02: Product Service

## Overview

In Milestone 1, product data was stored directly inside the `ProductListComponent`.

This milestone introduces a dedicated Angular service to manage product data and demonstrates Angular's Dependency Injection (DI) mechanism. The component becomes responsible only for presentation, while the service handles data retrieval.

To further improve maintainability, mock product data is extracted into a dedicated data file and consumed through the service layer.

---

## Objectives

* Create an Angular service
* Understand Dependency Injection
* Move mock product data out of the component
* Introduce a dedicated data source file
* Improve separation of concerns
* Prepare for future HTTP integration

---

## Git Information

### Branch

```bash
feature/product-service
```

### Tag

```bash
v0.2-product-service
```

---

## Project Structure

```text
src/
├── app/
│   ├── features/
│   │   └── products/
│   │       ├── product-list/
│   │       │   ├── product-list.component.ts
│   │       │   ├── product-list.component.html
│   │       │   └── product-list.component.spec.ts
│   │       │
│   │       ├── models/
│   │       │   └── product.ts
│   │       │
│   │       ├── services/
│   │       │   ├── product.service.ts
│   │       │   └── product.service.spec.ts
│   │       │
│   │       └── data/
│   │           └── products.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.ts
│
├── assets/
├── styles.scss
└── main.ts
```

---

## Step 1: Create Product Data File

### data/products.ts

```ts
import { Product } from '../models/product';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    productName: 'Leaf Rake',
    productCode: 'GDN-0011',
    releaseDate: 'March 19, 2024',
    price: 19.95,
    imageUrl: 'assets/images/leaf_rake.png'
  },
  {
    id: 2,
    productName: 'Garden Cart',
    productCode: 'GDN-0023',
    releaseDate: 'March 18, 2024',
    price: 32.99,
    imageUrl: 'assets/images/garden_cart.png'
  }
];
```

---

## Step 2: Create Product Service

### services/product.service.ts

```ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { PRODUCTS } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Product[] {
    return PRODUCTS;
  }
}
```

---

## Step 3: Inject Service into Product List Component

### Before

```ts
products: Product[] = [
  ...
];
```

### After

```ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
```

---

## Angular Concepts Learned

### Service

A service is used to encapsulate business logic and data access.

Benefits:

* Reusable
* Testable
* Maintainable
* Separation of concerns

---

### Dependency Injection

Angular automatically creates and injects service instances.

```ts
constructor(
  private productService: ProductService
) {}
```

Benefits:

* Loose coupling
* Easier testing
* Better maintainability

---

### Root Provider

```ts
@Injectable({
  providedIn: 'root'
})
```

Benefits:

* Singleton instance
* Available throughout the application
* Tree-shakable

---

## Architecture Evolution

### Milestone 1

```text
ProductListComponent
├── UI Logic
└── Product Data
```

### Milestone 2

```text
products.ts
      │
      ▼
ProductService
      │
      ▼
ProductListComponent
      │
      ▼
HTML Template
```

---

## Validation Checklist

* [ ] Product service created
* [ ] Product service returns data from products.ts
* [ ] Product list component injects service
* [ ] Product list displays data correctly
* [ ] Application builds successfully
* [ ] Unit tests pass

---

## Commit History

### Commit 1

```bash
git commit -m "feat(products): create product service and consume data through service"
```

---

## Pull Request

### Title

```text
feat(products): add product service and dependency injection
```

### Description

* Created ProductService
* Moved mock product data to products.ts
* Introduced Angular Dependency Injection
* Improved separation of concerns
* Established a dedicated data layer
* Prepared architecture for future HTTP integration

---

## Milestone Progress

```text
✅ Milestone 0 - Angular 16 + Docker + Tailwind Setup
✅ Milestone 1 - Product List
✅ Milestone 2 - Product Service
⬜ Milestone 3 - Setup Unit and E2E Tests using Vite and Playwright
⬜ Milestone 4 - Product Detail
⬜ Milestone 5 - Product Filter
⬜ Milestone 6 - Star Component
⬜ Milestone 7 - HTTP Client Integration
⬜ Milestone 8 - Lazy Loaded Product Module
```

---

## Next Milestone

### Milestone 3: Setup Unit and E2E Tests using Vite and Playwright

Upcoming topics:

* Vitest configuration for Angular
* Playwright E2E configuration and browsers setup
* Writing unit tests with Vitest
* Writing end-to-end user flow tests with Playwright
