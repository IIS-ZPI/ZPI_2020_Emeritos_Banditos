import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { DataService } from '../data-service/data-service.service';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  errorMessage = '';
  title = 'frontend';
  categories$: Observable<Category[]> = this.dataService.categories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  items$: Observable<Product[]> = this.dataService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private dataService: DataService) { }

  ngOnInit() {
    const darkThemeSelected =
      localStorage.getItem('theme') !== null &&
      localStorage.getItem('theme') === 'dark';
    darkThemeSelected
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize != null) {
      document.body.classList.add('font-' + fontSize);
    }
  }

}
