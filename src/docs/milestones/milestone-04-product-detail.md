# Milestone 04: Product Detail Component (Routing & Parameters)

## Overview

In the previous milestone, users could view a list of products. However, there was no way to view detailed information about an individual product.

This milestone introduces a dedicated Product Detail page and Angular Router parameters. Users can now navigate from the Product List to a Product Detail page where product information is displayed based on the selected product ID.

This milestone demonstrates one of the most common Angular patterns: **Master-Detail Navigation**.

---

## Objectives

* Create a Product Detail Component
* Configure Angular routing with parameters
* Navigate from Product List to Product Detail
* Retrieve route parameters using `ActivatedRoute`
* Lookup a product by `productId`
* Display full product details with a rich layout
* Add programmatic back-navigation using `Router`
* Implement the Master-Detail pattern

---

## Git Information

### Branch

```bash
feature/product-detail
```

### Tag

```bash
v0.4-product-detail
```

---

## Project Structure

```text
src/
├── app/
│   ├── features/
│   │   ├── home/
│   │   │   └── welcome.component.ts
│   │   │
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

## Step 1: Generate Product Detail Component

```bash
ng generate component features/products/product-detail
```

Generated files:

```text
product-detail.component.ts
product-detail.component.html
product-detail.component.spec.ts
```

---

## Step 2: Add Product Lookup Method

### services/product.service.ts

```ts
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
```

> **Note:** The product model uses `IProduct` (interface) and `productId` as the primary key — not `id`.

---

## Step 3: Configure Route Parameter

### app-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './features/home/welcome.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Route examples:

```text
/products/1
/products/2
/products/5
```

---

## Step 4: Register ProductDetailComponent in AppModule

### app.module.ts

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './features/home/welcome.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, ProductListComponent, ProductDetailComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## Step 5: Add Navigation from Product List

### product-list.component.html

The product name in each row is a router link navigating to the detail page using `productId`:

```html
<tr *ngFor="let product of products; trackBy: trackByProductId">
  <td class="border p-2">
    <img
      [src]="product.imageUrl"
      [title]="product.productName"
      [style.width.px]="imageWidth"
      [style.margin.px]="imageMargin"
    />
  </td>
  <td class="border p-2">
    <a [routerLink]="['/products', product.productId]">
      {{ product.productName }}
    </a>
  </td>
  ...
</tr>
```

### product-list.component.ts

```ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  readonly pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  protected products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  trackByProductId(index: number, product: IProduct): number {
    return product.productId;
  }
}
```

> `trackByProductId` improves `*ngFor` rendering performance by giving Angular a stable identity per row.

---

## Step 6: Read Route Parameter

### product-detail.component.ts

```ts
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
```

> `Router` is injected alongside `ActivatedRoute` to support programmatic back-navigation via `onBack()`.

---

## Step 7: Display Product Details

### product-detail.component.html

```html
<div class="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow-md">
  <!-- Header -->
  <div class="border-b bg-gray-50 px-6 py-4">
    <h2 class="text-xl font-semibold text-gray-800">
      {{ pageTitle }}: {{ product?.productName }}
    </h2>
  </div>

  <!-- Body -->
  <div *ngIf="product" class="p-6">
    <div class="grid gap-8 md:grid-cols-3">
      <!-- Product Details -->
      <div class="space-y-4 md:col-span-2">
        <div class="grid grid-cols-3 gap-4">
          <span class="font-medium text-gray-600">Name:</span>
          <span class="col-span-2 text-gray-900">{{ product.productName }}</span>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <span class="font-medium text-gray-600">Code:</span>
          <span class="col-span-2 text-gray-900">
            {{ product.productCode | lowercase }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <span class="font-medium text-gray-600">Description:</span>
          <span class="col-span-2 text-gray-900">{{ product.description }}</span>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <span class="font-medium text-gray-600">Availability:</span>
          <span class="col-span-2 text-gray-900">{{ product.releaseDate }}</span>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <span class="font-medium text-gray-600">Price:</span>
          <span class="col-span-2 text-gray-900">
            {{ product.price | currency:'USD':'symbol' }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-4 items-center">
          <span class="font-medium text-gray-600">5 Star Rating:</span>
          <div class="col-span-2">
            <!-- Placeholder for Star Component (Milestone 05) -->
          </div>
        </div>
      </div>

      <!-- Product Image -->
      <div class="flex justify-center md:justify-end">
        <img
          class="w-52 rounded-lg border border-gray-200 shadow-sm"
          [src]="product.imageUrl"
          [title]="product.productName"
          [alt]="product.productName"
        />
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="border-t bg-gray-50 px-6 py-4">
    <button
      type="button"
      (click)="onBack()"
      class="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
    >
      ← Back
    </button>
  </div>
</div>
```

---

## Angular Concepts Learned

### Route Parameters

Angular routes can contain dynamic values.

```text
/products/:id
```

Example:

```text
/products/2
```

The value `2` becomes available through `ActivatedRoute`.

---

### ActivatedRoute

Provides access to information about the current route.

```ts
const id = Number(this.route.snapshot.paramMap.get('id'));
```

Used to read URL parameters synchronously via `snapshot`.

---

### Router (Programmatic Navigation)

`Router` enables navigation from within the component class.

```ts
this.router.navigate(['/products']);
```

Used here to implement the **Back** button without a `routerLink` in the template.

---

### IProduct Interface

The product model is defined as a TypeScript interface using the `I` prefix convention:

```ts
export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}
```

---

### trackBy in *ngFor

`trackByProductId` gives Angular a stable identity for each row, avoiding unnecessary DOM re-renders.

```ts
trackByProductId(index: number, product: IProduct): number {
  return product.productId;
}
```

---

### Master-Detail Pattern

A common enterprise application pattern.

```text
Product List
      │
      ▼
Select Product (click name link)
      │
      ▼
Product Detail  ──(← Back)──▶  Product List
```

Benefits:

* Better navigation
* Improved user experience
* Scalable architecture

---

### Pipes Used

| Pipe       | Usage                              |
|------------|------------------------------------|
| `lowercase` | Normalise product code display    |
| `currency`  | Format price as `USD` symbol      |

---

## Architecture Evolution

### Before

```text
Welcome  →  Product List
```

### After

```text
Welcome  →  Product List  →  Product Detail
                          ←  (← Back button)
```

---

## Validation Checklist

* [x] Product Detail component created
* [x] Route parameter `products/:id` configured in `app-routing.module.ts`
* [x] `ProductDetailComponent` declared in `AppModule`
* [x] Product list name column contains `routerLink` to `/products/:productId`
* [x] Product `productId` retrieved from route snapshot
* [x] Product loaded from `ProductService.getProduct(id)`
* [x] Product details displayed with rich Tailwind layout (header / body / footer)
* [x] `description` and `imageUrl` displayed (beyond the basic milestone plan)
* [x] `onBack()` programmatic navigation implemented via `Router`
* [x] `trackByProductId` added to `*ngFor` in product list
* [ ] `v0.4-product-detail` tag created
* [ ] Unit tests expanded (spec files are skeleton only)

---

## Commit History

### Commit 1

```bash
git commit -m "feat: enhance product detail view with improved layout and navigation; add product images to list"
```

---

## Pull Request

### Title

```text
feat(products): add product detail page with route parameters
```

### Description

* Added `ProductDetailComponent` with `ActivatedRoute` for route parameter reading
* Added `Router` injection for programmatic back-navigation via `onBack()`
* Configured `products/:id` route in `AppRoutingModule`
* Registered `ProductDetailComponent` in `AppModule`
* Added `getProduct(id)` lookup method to `ProductService` using `productId`
* Added `routerLink` to product name in `ProductListComponent`
* Enhanced detail template with Tailwind grid layout, product image, and all `IProduct` fields
* Added `trackByProductId` to `*ngFor` in product list for performance
* Implemented Master-Detail navigation pattern

---

## Milestone Progress

```text
✅ Milestone 0 - Angular 16 + Docker + Tailwind Setup
✅ Milestone 1 - Product List
✅ Milestone 2 - Product Service
✅ Milestone 3 - Testing Setup (Vitest + Playwright)
✅ Milestone 4 - Product Detail Component
⬜ Milestone 5 - Star Component
⬜ Milestone 6 - HTTP Client Integration
⬜ Milestone 7 - Lazy Loaded Product Module
```

---

## Next Milestone

### Milestone 5: Star Component

Upcoming topics:

* Component Communication
* `@Input()`
* Reusable UI Components
* Event Binding
* Output Events
* Component Composition

> The `5 Star Rating` placeholder in the product detail template is already in place, waiting for the Star Component from Milestone 5.
