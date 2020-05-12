import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  title = 'frontend';
  categories = [
    { id: 0, name: 'Groceries' },
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Chemicals' }
  ];
  items = [
    {
      id: 0,
      name: 'Jabłko',
      categoryId: 0,
      state: 'Arizona',
      wholesalePrice: 1.00,
      endPrice: 2.00,
      salePrice: 1.75,
      profitMargin: 0.75
    }, {
      id: 1,
      name: 'iPhone 4',
      categoryId: 1,
      state: 'California',
      wholesalePrice: 200.00,
      endPrice: 250.00,
      salePrice: 225.00,
      profitMargin: 25.00
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
