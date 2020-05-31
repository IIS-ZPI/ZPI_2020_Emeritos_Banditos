import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initTheme();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  initFont() {
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize != null) {
      this.fontSizeForm.setValue({ fontSizeOption: fontSize, tc: true });
      document.body.classList.add('font-' + fontSize);
    } else {
      this.fontSizeForm.setValue({ fontSizeOption: 'small', tc: true });
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
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }

}
