import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  categories = [{id: 0, name: 'Groceries'}, {id: 1, name: 'Electronics'}, {id: 2, name: 'Chemicals'}];
  items = [{ id: 0, name: 'Test', state: 'Arizona', wholesalePrice: 1.00, endPrice: 2.00, salePrice: 1.75, profitMargin: 0.75 }];
}
