import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit, OnDestroy {

  darkMode: string;
  darkModeSubscription: Subscription;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.darkModeSubscription = this.localStorageService.darkMode.subscribe(darkModeKey => {
      this.darkMode = darkModeKey.value;
    });
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }

}
