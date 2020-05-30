import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.css']
})
export class ModalSettingsComponent implements OnInit {

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
  }

}
