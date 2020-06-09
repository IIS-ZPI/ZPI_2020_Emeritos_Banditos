import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsTableComponent } from './products-table/products-table.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
