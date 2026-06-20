# Milestone 07: Feature Modules, Shared Module & Lazy Loading

## Overview

Until now, all product-related functionality has been part of the root application structure. As Angular applications grow, keeping all components, routes, and dependencies in the AppModule becomes difficult to maintain and negatively impacts startup performance.

This milestone introduces three key Angular architectural concepts:

* Feature Modules
* Shared Module
* Lazy Loading

The Product feature is moved into its own Feature Module with dedicated routing. A Shared Module is introduced to centralize reusable Angular modules and shared components such as the Star Component.

The Product Module is then loaded lazily using Angular Router's `loadChildren` mechanism, reducing the application's initial bundle size and improving scalability.

---

## Objectives

* Create a Shared Module
* Create a Product Feature Module
* Create a Product Routing Module
* Move Product components into ProductModule
* Move StarComponent into SharedModule
* Configure lazy loading with `loadChildren`
* Understand Angular module boundaries
* Reduce initial application bundle size
* Improve startup performance
* Prepare for enterprise-scale Angular applications

---

## Git Information

### Branch

```bash
feature/lazy-loaded-product-module
```

### Tag

```bash
v0.7-lazy-loaded-product-module
```

---

## Project Structure

```text
src/
├── app/
│
│   ├── shared/
│   │   ├── star/
│   │   │   ├── star.component.ts
│   │   │   └── star.component.spec.ts
│   │   │
│   │   └── shared.module.ts
│   │
│   ├── features/
│   │   └── products/
│   │       ├── product.module.ts
│   │       ├── product-routing.module.ts
│   │       │
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
├── styles.scss
└── main.ts
```

---

## Step 1: Create Shared Module

### shared/shared.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent
  ]
})
export class SharedModule { }
```

---

## Why Shared Module?

Without a Shared Module, every feature module must import Angular modules individually.

### Before

```ts
imports: [
  CommonModule,
  FormsModule
]
```

### After

```ts
imports: [
  SharedModule
]
```

Benefits:

* Centralized shared dependencies
* Reusable UI components
* Reduced duplication
* Cleaner feature modules

---

## Step 2: Create Product Module

### features/products/product.module.ts

```ts
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule {}
```

---

## Step 3: Create Product Routing Module

### features/products/product-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule {}
```

---

## Step 4: Configure Lazy Loading

### app-routing.module.ts

#### Before

```ts
const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  }
];
```

#### After

```ts
const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.module')
        .then(m => m.ProductModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

---

## Step 5: Simplify AppModule

### Before

```ts
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    StarComponent
  ]
})
export class AppModule {}
```

### After

```ts
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class AppModule {}
```

Product components now belong to ProductModule.

StarComponent now belongs to SharedModule.

---

## Angular Concepts Learned

### Shared Module

Contains reusable components and Angular modules shared across features.

Examples:

```text
SharedModule
├── StarComponent
├── CommonModule
└── FormsModule
```

Benefits:

* Reusability
* Cleaner imports
* Consistent architecture

---

### Feature Module

Groups related functionality into a dedicated module.

Example:

```text
ProductModule
├── Product List
├── Product Detail
├── Product Routing
├── Product Service
└── Product Models
```

Benefits:

* Better organization
* Easier maintenance
* Clear ownership

---

### Routing Module

Separates routing configuration from feature implementation.

```ts
ProductRoutingModule
```

Benefits:

* Cleaner architecture
* Easier navigation management
* Feature isolation

---

### Lazy Loading

Feature code is downloaded only when needed.

```ts
loadChildren: () =>
  import('./features/products/product.module')
    .then(m => m.ProductModule)
```

Benefits:

* Faster startup
* Smaller initial bundle
* Better user experience

---

### Bundle Splitting

Angular CLI automatically creates separate JavaScript bundles.

Example:

```text
main.js
runtime.js
polyfills.js
product-module.js
```

The Product feature is downloaded only when a user visits a product route.

---

### Module Boundaries

Each module owns its own:

```text
Module
├── Components
├── Routing
├── Services
└── Dependencies
```

Benefits:

* Reduced coupling
* Better scalability
* Easier testing

---

## Architecture Evolution

### Before

```text
AppModule
├── WelcomeComponent
├── ProductListComponent
├── ProductDetailComponent
└── StarComponent
```

### After

```text
AppModule
│
├── WelcomeComponent
│
├── SharedModule
│   └── StarComponent
│
└── Lazy Loaded ProductModule
    ├── ProductListComponent
    ├── ProductDetailComponent
    └── ProductRoutingModule
```

---

## Validation Checklist

* [ ] SharedModule created
* [ ] StarComponent moved to SharedModule
* [ ] ProductModule created
* [ ] ProductRoutingModule created
* [ ] Product routes moved to ProductRoutingModule
* [ ] SharedModule imported into ProductModule
* [ ] loadChildren configured
* [ ] Product components removed from AppModule
* [ ] Product List route works
* [ ] Product Detail route works
* [ ] Application builds successfully
* [ ] Lazy-loaded chunk generated
* [ ] Unit tests pass

---

## Commit History

### Commit 1

```bash
git commit -m "feat: refactor product module to use lazy loading and create shared module"
```

---

## Pull Request

### Title

```text
feat(products): implement feature modules, shared module and lazy loading
```

### Description

* Added SharedModule
* Moved StarComponent to SharedModule
* Added ProductModule
* Added ProductRoutingModule
* Moved product routes into feature routing
* Configured lazy loading with loadChildren
* Reduced root module responsibilities
* Improved bundle splitting
* Improved startup performance
* Prepared architecture for enterprise-scale applications

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
✅ Milestone 7 - Feature Modules, Shared Module & Lazy Loading
```

---

## Next Milestone

### Milestone 08: Core Module

Upcoming topics:

* CoreModule
* Singleton Services
* Layout Components
* Shell Components
* Navigation Components
* Application-Wide Services
* Authentication Foundation
* Enterprise Angular Architecture
