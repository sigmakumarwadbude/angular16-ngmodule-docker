import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './features/home/welcome.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { StarComponent } from './shared/star/star.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, ProductListComponent, ProductDetailComponent, StarComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
