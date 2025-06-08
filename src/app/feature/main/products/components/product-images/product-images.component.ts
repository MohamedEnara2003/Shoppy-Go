import { Component, input, linkedSignal, signal } from '@angular/core';
import { ProductImagesType } from '../../../../../core/interfaces/products.type';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-product-images',
  imports: [SharedModule],
  template: `
<section class="w-full" role="region" aria-label="Product Images Gallery">
<figure class="flex flex-wrap items-start gap-5">
<ul class="flex flex-row lg:flex-col gap-5" role="tablist" aria-label="Product image thumbnails"> 
  @for (item of images(); track item.img_name; let index = $index) {
  <li (click)="currentImage.set(item)"
      (keydown.enter)="currentImage.set(item)"
      (keydown.space)="currentImage.set(item)"
      role="tab"
      [attr.aria-selected]="item.img_name === currentImage().img_name"
      [attr.aria-label]="'View ' + item.img_name"
      tabindex="0"
      class="rounded-sm size-20 cursor-pointer flex justify-center border border-primary/10 p-1 focus:outline-none focus:ring-2 focus:ring-secondary"
      [ngClass]="item.img_name === currentImage().img_name ? 'border-secondary' : ''">
  @defer (on viewport) {
    <img [src]="item.img_url" 
      [alt]="item.img_name" 
      loading="lazy"
      class="size-full object-contain"
      [attr.aria-hidden]="true">
  }@placeholder {
    <div class="flex items-center justify-center size-full" role="status" aria-label="Loading image">
      <p-progress-spinner fill="transparent" animationDuration=".5s" 
        [style]="{ width: '50px', height: '50px' }" />
    </div>
  }
  </li>
  }
</ul>
  <div class="size-100 overflow-hidden" role="tabpanel" [attr.aria-label]="'Current product image: ' + currentImage().img_name">  
  @if(currentImage()){
    <img [src]="currentImage().img_url" 
    [alt]="currentImage().img_name" 
    loading="lazy"
    class="size-full object-contain animate-sideUp"
    [attr.aria-hidden]="true">
  }
  </div>
</figure>
</section>
  `,
})

export class ProductImagesComponent {
  images = input.required<ProductImagesType[]>();
  currentImage = linkedSignal<ProductImagesType>(() => {
    const images = this.images();
    if (!images || images.length === 0) {
      return {img_url: '', img_name: ''};
    }
    return images[0];
  });
}
