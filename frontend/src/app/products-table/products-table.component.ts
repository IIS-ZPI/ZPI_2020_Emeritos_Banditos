import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY, from } from 'rxjs';
import { DataService } from '../data-service/data-service.service';
import { catchError, finalize, isEmpty, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  newName: string;
  newCategory: string;
  newState: string;
  newQuantity: number;
  newNetto: number;
  newClientPrice: number;
  itemToDelete: Product;

  constructor(private dataService: DataService, private modalService: NgbModal, private toastService: ToastrService) { }

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

  open(content: any) {
    this.modalService.open(content);
  }

  deleteProduct(item: Product) {
    let errorOccured = false;
    this.items$ = this.dataService.deleteProduct(item.id).pipe(
      catchError(err => {
        this.toastService.error('Nie udało się usunąć produktu', 'Błąd');
        errorOccured = true;
        return this.dataService.products$;
      }),
      tap(value => {
        if (!errorOccured) {
          this.toastService.success('Pomyślnie usunięto produkt', 'Sukces');
        }
      })
    );
  }

  toggleEditMode(item: Product) {
    if (!this.editMode) {
      this.editId = item.id;
      this.newName = item.name;
      this.newCategory = item.category;
      this.newState = item.state;
      this.newQuantity = item.quantity;
      this.newNetto = item.netto;
      this.newClientPrice = item.clientprice;
      this.editMode = true;
    } else if (this.editMode && this.editId !== item.id) {
      this.editId = item.id;
      this.newName = item.name;
      this.newCategory = item.category;
      this.newState = item.state;
      this.newQuantity = item.quantity;
      this.newNetto = item.netto;
      this.newClientPrice = item.clientprice;
    } else {
      this.editMode = false;
    }
  }

  editProduct(item: Product, confirmed?: boolean) {
    if (confirmed) {
      let errorOccured = false;
      this.items$ = this.dataService.editProduct(
        {
          id: item.id,
          name: this.newName,
          category: this.newCategory,
          state: this.newState,
          quantity: this.newQuantity,
          netto: this.newNetto,
          clientprice: this.newClientPrice
        }).pipe(
          catchError(err => {
            this.toastService.error('Nie udało się zmodyfikować produktu', 'Błąd');
            errorOccured = true;
            return this.dataService.products$;
          }),
          tap(value => {
            if (!errorOccured) {
              this.toastService.success('Pomyślnie zmodyfikowano produkt', 'Sukces');
            }
          })
        );
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
