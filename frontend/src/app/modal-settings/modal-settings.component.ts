import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.css']
})
export class ModalSettingsComponent implements OnInit {

  fontSizeForm: FormGroup = new FormGroup({
    fontSizeOption: new FormControl()
  });

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content);
    const darkSwitch = document.getElementById('darkSwitch') as HTMLInputElement;
    if (darkSwitch) {
      initTheme();
      darkSwitch.addEventListener('change', (event) => {
        resetTheme();
      });
      function initTheme() {
        const darkThemeSelected =
          localStorage.getItem('theme') !== null &&
          localStorage.getItem('theme') === 'dark';
        darkSwitch.checked = darkThemeSelected;
        darkThemeSelected
          ? document.body.classList.add('dark')
          : document.body.classList.remove('dark');
      }
      function resetTheme() {
        if (darkSwitch.checked) {
          document.body.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark');
          localStorage.removeItem('theme');
        }
      }
    }
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize != null) {
      this.fontSizeForm.patchValue({fontSizeOption: fontSize, tc: true});
      document.body.classList.add('font-' + fontSize);
    } else {
      this.fontSizeForm.patchValue({fontSizeOption: 'small', tc: true});
    }
    const optionsId = 'fontSizeOption';
    this.fontSizeForm.controls[optionsId].valueChanges.subscribe((state: any) => {
      localStorage.setItem('fontSize', state);
      document.body.classList.remove('font-small');
      document.body.classList.remove('font-medium');
      document.body.classList.remove('font-large');
      document.body.classList.add('font-' + state);
    });
  }

}
