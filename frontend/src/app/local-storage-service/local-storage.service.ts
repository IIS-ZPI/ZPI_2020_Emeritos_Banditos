import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { share } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string, value: any }>();
  public darkMode = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
      this.stop();
  }

  public store(key: string, data: any): void {
      localStorage.setItem(key, JSON.stringify(data));
      this.onSubject.next({key, value: data});
  }

  public clear(key) {
      localStorage.removeItem(key);
      this.onSubject.next({key, value: null});
  }


  private start(): void {
      window.addEventListener('storage', this.storageEventListener.bind(this));
      this.onSubject.next({key: 'theme', value: localStorage.getItem('theme')});
  }

  private storageEventListener(event: StorageEvent) {
      if (event.storageArea === localStorage) {
          let v;
          try {
              v = JSON.parse(event.newValue);
          } catch (e) {
              v = event.newValue;
          }
          this.onSubject.next({key: event.key, value: v});
      }
  }

  private stop(): void {
      window.removeEventListener('storage', this.storageEventListener.bind(this));
      this.onSubject.complete();
  }

}
