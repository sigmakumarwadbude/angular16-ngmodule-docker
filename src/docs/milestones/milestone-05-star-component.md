# Milestone 05: Star Component

## Overview

In previous milestones, product ratings were stored as numeric values within the product model but were not displayed in a user-friendly way.

This milestone introduces a reusable Star Component that visualizes product ratings using Font Awesome stars. The component demonstrates Angular component communication through `@Input()` and `@Output()` decorators and introduces the `EventEmitter` pattern.

This milestone is an important step toward building reusable UI components and understanding parent-child communication in Angular.

---

## Objectives

* Create a reusable Star Component
* Install and configure Font Awesome 4
* Learn component composition
* Use `@Input()` for parent-to-child communication
* Use `@Output()` and `EventEmitter` for child-to-parent communication
* Implement the `OnChanges` lifecycle hook
* Display product ratings visually
* Improve UI reusability

---

## Git Information

### Branch

```bash
feature/star-component
```

### Tag

```bash
v0.5-star-component
```

---

## Project Structure

```text
src/
├── app/
│   ├── shared/
│   │   └── star/
│   │       ├── star.component.ts
│   │       ├── star.component.spec.ts
│   │
│   ├── features/
│   │   └── products/
│   │       ├── product-list/
│   │       │   ├── product-list.component.ts
│   │       │   ├── product-list.component.html
│   │       │   └── product-list.component.spec.ts
│   │       │
│   │       ├── product-detail/
│   │       ├── models/
│   │       │   └── product.ts
│   │       ├── services/
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

## Existing Product Model

The application already contains a rating property.

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

No model changes are required in this milestone.

---

## Step 1: Install Font Awesome 4

Install Font Awesome:

```bash
npm install font-awesome@4.7.0
```

---

## Step 2: Configure Font Awesome

### angular.json

```json
"styles": [
  "src/styles.scss",
  "node_modules/font-awesome/css/font-awesome.min.css"
]
```

---

## Step 3: Generate Star Component

Generate a reusable shared component:

```bash
ng generate component shared/star
```

Generated files:

```text
star.component.ts
star.component.spec.ts
```

---

## Step 4: Create Star Component

### shared/star/star.component.ts

```ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'pm-star',
  template: `
    <div class="crop"
         [style.width.px]="cropWidth"
         [title]="rating"
         (click)="onClick()">

      <div style="width: 75px">
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>

    </div>
  `,
  styles: [`
    .crop {
      overflow: hidden;
    }

    div {
      cursor: pointer;
    }
  `]
})
export class StarComponent implements OnChanges {

  @Input() rating = 0;

  cropWidth = 75;

  @Output()
  ratingClicked: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
  }

  onClick(): void {
    this.ratingClicked.emit(
      `The rating ${this.rating} was clicked!`
    );
  }
}
```

---

## Step 5: Register Component

### app.module.ts

```ts
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    StarComponent
  ]
})
export class AppModule {}
```

---

## Step 6: Use Star Component

### product-list.component.html

```html
<td>
  <pm-star
    [rating]="product.starRating"
    (ratingClicked)="onRatingClicked($event)">
  </pm-star>
</td>
```

---

## Step 7: Handle Child Events

### product-list.component.ts

```ts
pageTitle = 'Product List';

onRatingClicked(message: string): void {
  this.pageTitle =
    'Product List: ' + message;
}
```

---

## Angular Concepts Learned

### Component Composition

Components can be nested inside other components.

```html
<app-star></app-star>
```

Benefits:

* Reusability
* Maintainability
* Separation of concerns

---

### @Input()

Allows a parent component to send data to a child component.

Parent:

```html
<app-star
  [rating]="product.starRating">
</app-star>
```

Child:

```ts
@Input()
rating = 0;
```

Benefits:

* One-way data flow
* Loose coupling
* Reusable components

---

### @Output()

Allows a child component to send events to its parent.

Child:

```ts
@Output()
ratingClicked =
  new EventEmitter<string>();
```

Parent:

```html
<app-star
  (ratingClicked)="onRatingClicked($event)">
</app-star>
```

Benefits:

* Event-driven communication
* Component independence
* Better reusability

---

### EventEmitter

Used to emit custom events.

```ts
this.ratingClicked.emit(
  `The rating ${this.rating} was clicked!`
);
```

---

### OnChanges Lifecycle Hook

Runs whenever an input property changes.

```ts
ngOnChanges(): void {
  this.cropWidth =
    this.rating * 75 / 5;
}
```

Used to dynamically update the star display.

---

## Architecture Evolution

### Before

```text
Product List
└── Numeric Rating
```

### After

```text
ProductListComponent
       │
       │ @Input()
       ▼
StarComponent
       │
       │ @Output()
       ▼
ProductListComponent
```

---

## Validation Checklist

* [ ] Font Awesome installed
* [ ] Star component created
* [ ] Star component registered in AppModule
* [ ] Rating passed using @Input()
* [ ] Star display renders correctly
* [ ] Click event emits message
* [ ] Parent receives event
* [ ] Product list displays ratings
* [ ] Application builds successfully
* [ ] Unit tests pass

---

## Commit History

### Commit 1

```bash
git commit -m "feat: add StarComponent and integrate Font Awesome for star ratings"
```

---

## Pull Request

### Title

```text
feat(shared): add reusable star component with input and output bindings
```

### Description

* Installed Font Awesome 4
* Added reusable Star Component
* Implemented @Input() binding
* Implemented @Output() event communication
* Added EventEmitter support
* Added OnChanges lifecycle handling
* Displayed product ratings visually
* Improved UI reusability

---

## Milestone Progress

```text
✅ Milestone 0 - Angular 16 + Docker + Tailwind Setup
✅ Milestone 1 - Product List
✅ Milestone 2 - Product Service
✅ Milestone 3 - Product Detail
✅ Milestone 4 - Product Filter
✅ Milestone 5 - Star Component
⬜ Milestone 6 - HTTP Client Integration
⬜ Milestone 7 - Lazy Loaded Product Module
```

---

## Next Milestone

### Milestone 06: HTTP Client Integration

Upcoming topics:

* HttpClient
* Observables
* RxJS
* Dependency Injection
* API Integration
* Loading Indicators
* Error Handling
* Async Data Flow
