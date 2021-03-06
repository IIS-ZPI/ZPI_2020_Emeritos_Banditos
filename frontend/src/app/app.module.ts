import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ProductsTableComponent } from './products-table/products-table.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSettingsComponent } from './modal-settings/modal-settings.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ModalAboutComponent } from './modal-about/modal-about.component';

@NgModule({
   declarations: [
      AppComponent,
      ProductsTableComponent,
      ModalComponent,
      ModalSettingsComponent,
      MenuBarComponent,
      ModalAboutComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      CommonModule,
      HttpClientModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
