import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private quantity = new BehaviorSubject<number>(0);
  private addedQuantity = new BehaviorSubject<number>(0);
  quantity$ = this.quantity.asObservable();
  addedQuantity$ = this.addedQuantity.asObservable();

  constructor() {}

  // Get current quantity value
  getQuantity(): number {
    return this.quantity.getValue();
  }

  // Increase quantity
  increase() {
    const current = this.quantity.getValue();
    this.quantity.next(current + 1);
  }

  // Decrease quantity (but not below 1)
  decrease() {
    const current = this.quantity.getValue();
    if (current > 0) {
      this.quantity.next(current - 1);
    }
  }

  addToCart() {
    const currentAdded = this.addedQuantity.getValue();
    const selectedQty = this.quantity.getValue();
    console.log(currentAdded + selectedQty);
    this.addedQuantity.next(currentAdded + selectedQty);
    this.reset();
  }

  resetAddToCart() {
    this.addedQuantity.next(0);
  }

  // Reset quantity to 1 (optional)
  reset() {
    this.quantity.next(0);
  }
}
