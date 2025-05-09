// menu.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuItems: string[] = ['Collections', 'Men', 'Women', 'About', 'Contact'];

  constructor() {}

  getMenuItems() {
    return this.menuItems;
  }
}
