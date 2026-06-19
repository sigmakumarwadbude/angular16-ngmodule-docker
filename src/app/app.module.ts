import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './features/home/welcome.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, ProductListComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
