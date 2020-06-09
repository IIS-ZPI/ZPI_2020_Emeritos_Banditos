import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.css']
})
export class ModalSettingsComponent implements OnInit {

  darkModeChecked: boolean;

  fontSizeForm: FormGroup = new FormGroup({
    fontSizeOption: new FormControl('small')
  });

  constructor(config: NgbModalConfig, private modalService: NgbModal, private localStorageService: LocalStorageService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initTheme();
    this.initFont();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  initFont() {
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize != null) {
      this.fontSizeForm.setValue({ fontSizeOption: fontSize });
      document.body.classList.add('font-' + fontSize);
    } else {
      this.fontSizeForm.setValue({ fontSizeOption: 'small'});
    }
  }

  changeFont() {
    localStorage.setItem('fontSize', this.fontSizeForm.value.fontSizeOption);
    document.body.classList.remove('font-small');
    document.body.classList.remove('font-medium');
    document.body.classList.remove('font-large');
    document.body.classList.add('font-' + this.fontSizeForm.value.fontSizeOption);
  }

  initTheme() {
    this.darkModeChecked = localStorage.getItem('theme') !== null && localStorage.getItem('theme') === 'dark';
    if (this.darkModeChecked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  resetTheme() {
    if (this.darkModeChecked) {
      document.body.classList.add('dark');
      this.localStorageService.store('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      this.localStorageService.clear('theme');
    }
  }

}
