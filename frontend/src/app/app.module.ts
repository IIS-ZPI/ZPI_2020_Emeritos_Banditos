import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from './products-table/products-table.component';

@NgModule({
   declarations: [
      AppComponent,
      ProductsTableComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
