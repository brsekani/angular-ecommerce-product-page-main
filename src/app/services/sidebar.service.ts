import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpen.asObservable();

  closeSidebar() {
    this.sidebarOpen.next(false);
  }

  openSidebar() {
    this.sidebarOpen.next(true);
  }
}
