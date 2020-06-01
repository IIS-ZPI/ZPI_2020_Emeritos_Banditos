import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { DataService } from '../data-service/data-service.service';
import { catchError, finalize, isEmpty, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  title = 'frontend';
  categories$: Observable<Category[]> = this.dataService.categories$.pipe(
    catchError(err => {
      this.toastService.error('Nie udało się pobrać listy kategorii', 'Błąd');
      return EMPTY;
    })
  );
  items$: Observable<Product[]> = this.dataService.products$.pipe(
    catchError(err => {
      this.toastService.error('Nie udało się pobrać listy produktów', 'Błąd');
      return EMPTY;
    })
  );
  editMode = false;
  editId: number;
  states$: Observable<string[]> = this.dataService.states$.pipe(
    catchError(err => {
      this.toastService.error('Nie udało się pobrać listy stanów', 'Błąd');
      return EMPTY;
    })
  );

  constructor(private dataService: DataService, private toastService: ToastrService) { }

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
    } else {
      localStorage.setItem('font-size', 'small');
      document.body.classList.add('font-small');
    }
  }

  deleteItem(itemId: number) {
    if (confirm('Czy na pewno chcesz usunąć produkt?')) {
      // TODO: Usuwanie produktu
    }
  }

  editItem(itemId: number, confirmed?: boolean) {
    if (!this.editMode) {
      this.editMode = true;
      this.editId = itemId;
    } else {
      if (confirmed) {
        // TODO: Zapisz zmiany
      } else {
        // Nic nie rób
      }
      this.editMode = false;
    }
  }

  addProduct(product: Product) {
    let errorOccured = false;
    this.items$ = this.dataService.postProduct(product).pipe(
      catchError(err => {
        this.toastService.error('Nie udało się dodać produktu', 'Błąd');
        errorOccured = true;
        return this.dataService.products$;
      }),
      tap(value => {
        if (!errorOccured) {
          this.toastService.success('Pomyślnie dodano produkt', 'Sukces');
        }
      })
    );
  }

}
