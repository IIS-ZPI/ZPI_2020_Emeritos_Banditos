import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private appBasePath = 'https://zpi-projekt-webapp-podatki-us.herokuapp.com/';
  private restServicesBasePath = 'rest-services/';

  public states$: Observable<string[]> = this.http.get<string[]>(this.appBasePath + this.restServicesBasePath + 'states').pipe(
    catchError(this.handleError)
  );

  public products$: Observable<Product[]> = this.http.get<Product[]>(this.appBasePath + this.restServicesBasePath + 'productList').pipe(
    catchError(this.handleError)
  );

  public categories$: Observable<Category[]> = this.http.get<Category[]>(this.appBasePath + this.restServicesBasePath + 'categories').pipe(
    catchError(this.handleError)
  );

  constructor(private http: HttpClient) { }

  public postProduct(product: Product): Observable<Product[]> {
    return this.http.post<any>(this.appBasePath + this.restServicesBasePath + 'product', product).pipe(
      catchError(this.handleError)
    );
  }

  public editProduct(product: Product): Observable<Product[]> {
    return this.http.post<any>(this.appBasePath + this.restServicesBasePath + 'edit', product).pipe(
      catchError(this.handleError)
    );
  }

  public deleteProduct(id: number): Observable<Product[]> {
    this.http.delete<any>(this.appBasePath + this.restServicesBasePath + 'delete/' + id).pipe(
      catchError(this.handleError)
    );
    return this.products$;
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
