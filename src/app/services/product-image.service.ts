import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  private readonly imagePathsThumbnail: string[] = [
    '/images/image-product-1-thumbnail.jpg',
    '/images/image-product-2-thumbnail.jpg',
    '/images/image-product-3-thumbnail.jpg',
    '/images/image-product-4-thumbnail.jpg',
  ];

  private readonly imagePaths: string[] = [
    '/images/image-product-1.jpg',
    '/images/image-product-2.jpg',
    '/images/image-product-3.jpg',
    '/images/image-product-4.jpg',
  ];

  getProductImagesThumbnail(): string[] {
    return this.imagePathsThumbnail;
  }

  getProductImages(): string[] {
    return this.imagePaths;
  }

  constructor() {}
}
