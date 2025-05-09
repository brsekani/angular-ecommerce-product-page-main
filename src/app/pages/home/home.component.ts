import { Component, EventEmitter, Output } from '@angular/core';
import { ProductImageService } from '../../services/product-image.service';
import { CartService } from '../../services/cart.service'; // <-- Make sure this is correctly imported
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  imagesThumbnail: string[] = [];
  images: string[] = [];
  activeImageIndex: number = 0;
  touchStartX = 0;
  quantity: number = 0;

  @Output() requestModalOpen = new EventEmitter<void>();

  constructor(
    private productImageService: ProductImageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.imagesThumbnail = this.productImageService.getProductImagesThumbnail();
    this.images = this.productImageService.getProductImages();
    this.cartService.quantity$.subscribe((qty) => {
      this.quantity = qty;
    });
  }

  setActiveImageIndex(index: number): void {
    this.activeImageIndex = index;
  }

  next() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }

  prev() {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.images.length) % this.images.length;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const diffX = touchEndX - this.touchStartX;

    if (Math.abs(diffX) > 50) {
      diffX > 0 ? this.prev() : this.next();
    }
  }

  openModalFromHome() {
    this.requestModalOpen.emit();
  }

  increase() {
    this.cartService.increase();
  }

  decrease() {
    this.cartService.decrease();
  }

  addToCart() {
    this.cartService.addToCart();
  }
}
