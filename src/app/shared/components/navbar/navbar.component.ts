import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { MenuService } from '../../../services/menu.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [NgFor, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  menuItems: string[] = [];
  activeIndex = 0;
  numberOfItems = 0;
  isDropdownOpen = false;

  constructor(
    private sidebarService: SidebarService,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems();
    this.cartService.addedQuantity$.subscribe((qty) => {
      this.numberOfItems = qty;
    });
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  onOpenSidebar() {
    this.sidebarService.openSidebar();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ClearAddTocart() {
    this.cartService.resetAddToCart();
  }
}
