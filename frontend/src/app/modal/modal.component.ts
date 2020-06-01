import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, EMPTY } from 'rxjs';
import { Category } from '../models/category';
import { DataService } from '../data-service/data-service.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() categories$: Observable<Category[]>;
  @Output() addProductEvent = new EventEmitter<Product>();
  states$: Observable<string[]> = this.dataService.states$.pipe(
    catchError(err => {
      this.toastService.error('Nie udało się pobrac listy stanów', 'Błąd');
      return EMPTY;
    })
  );

  name: string;
  category: string;
  state: string;
  netto: number;
  clientPrice: number;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private dataService: DataService,
              private toastService: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() { }

  open(content) {
    this.modalService.open(content);
    this.name = '';
    this.category = '';
    this.state = '';
    this.netto = 0;
    this.clientPrice = 0;
  }

  sumbitProduct() {
    this.addProductEvent.emit(
      {
        name: this.name,
        category: this.category,
        state: this.state,
        netto: this.netto,
        clientprice: this.clientPrice
      }
    );
  }
}
