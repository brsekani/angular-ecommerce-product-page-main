import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { MenuService } from '../../../services/menu.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  menuItems: string[] = [];

  @ViewChild('sidebarRef') sidebarRef!: ElementRef;

  private ignoreNextClick = false;

  constructor(
    private sidebarService: SidebarService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();

    this.sidebarService.sidebarOpen$.subscribe((state) => {
      this.isOpen = state;

      // Ignore the next click event after opening to prevent immediate close
      if (state) {
        this.ignoreNextClick = true;

        // Reset after a short delay
        setTimeout(() => {
          this.ignoreNextClick = false;
        }, 200);
      }
    });
  }

  onCloseSide() {
    this.sidebarService.closeSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.handleResize(event.target.innerWidth);
  }

  handleResize(windowWidth: number): void {
    if (windowWidth > 730) {
      this.sidebarService.closeSidebar();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.ignoreNextClick) return;

    const clickedInside = this.sidebarRef.nativeElement.contains(event.target);
    if (this.isOpen && !clickedInside) {
      this.sidebarService.closeSidebar();
    }
  }
}
