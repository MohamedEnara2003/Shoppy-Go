import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../../core/interfaces/products.type';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { BtnAddToCartComponent } from "../btn-add-to-cart/btn-add-to-cart.component";
import { AppStore } from '../../../../../store/app.store';

@Component({
  selector: 'app-product-card',
  imports: [SharedModule, RouterModule, BtnAddToCartComponent],
  template: `
  <article 
    class="group relative w-full h-70 flex flex-col justify-between text-primary shadow shadow-gray-400 
    rounded-box hover:shadow-xl p-2 duration-200 transition-shadow"
    [attr.aria-label]="'Product: ' + product().title"
    role="article">
  @defer (on viewport) {

  <div class="relative w-full h-[70%] flex justify-center items-center overflow-hidden">
  
  @if(product().stock_status === 'OUTSTOCK'){
  <span 
    class="text-xs px-2 p-1 absolute left-2 top-2 rounded-sm bg-secondary text-white/80 text-center z-40"
    role="status"
    aria-label="Product status">
    {{product().stock_status}}
  </span>
  }@else if (product().discount > 0) {
  <span 
    class="text-xs px-2 p-1 absolute left-2 top-2 rounded-sm bg-secondary text-white/80 text-center z-40"
    role="status"
    aria-label="Discount percentage">
    -{{product().discount / 100| percent : '1.0-1'}}
  </span>
  }

  <div [routerLink]="['/main/product/' , product().id]" (click)="appStore.quantityChange(1)" 
  class="relative size-full bg-white flex justify-center items-center">
  <img 
    [src]="product().images[0].img_url" 
    [alt]="product().images[0].img_name"
    loading="lazy" 
    class="size-[80%] sm:size-[90%] object-contain aspect-square"
    [attr.aria-label]="'Product image: ' + product().images[0].img_name">
    
  </div>
  
  <nav class="absolute right-2 top-5 flex flex-col gap-2 z-50" aria-label="Product actions">
  <button 
    type="button" 
    (click)="appStore.toggleWishlist(product())"
    [attr.aria-label]="appStore.isInWishlist(product()) ? 'Remove from wishlist' : 'Add to wishlist'"
    [attr.aria-pressed]="appStore.isInWishlist(product())">
  <i class="cursor-pointer hover:text-secondary duration-200 transition-colors z-10 pi"
    [ngClass]="appStore.isInWishlist(product()) ? 'pi-heart-fill text-secondary' : 'pi-heart'"
    aria-hidden="true">
  </i>
  </button>
  <button  
    type="button" 
    [routerLink]="['/main/product/' , product().id]" 
    (click)="appStore.quantityChange(1)"
    aria-label="Quick view product"> 
  <i class="cursor-pointer hover:text-secondary duration-200 transition-colors z-10 pi pi-eye"
    aria-hidden="true"></i>
  </button>
  </nav>
  @let selectedSize = product().sizes[0] ;
  <app-btn-add-to-cart 
    class="w-full absolute bottom-0 translate-y-20 group-hover:translate-y-0  
    duration-300 transition-transform z-50" 
    [product]="product()" 
    [selectSize]="selectedSize"
  />
  </div>

  <div class="w-full flex flex-col gap-2">
  <h2 class="line-clamp-1 capitalize text-sm">{{product().title}}</h2>

  <div class="flex gap-4 text-sm">
  <small class="text-red-500" aria-label="Final price">{{product().final_price | currency : 'EGP' }}</small>
  @if(product().final_price !== product().price ){
    <small class="line-through" aria-label="Original price">{{product().price | currency : 'EGP' }}</small>
  }
  </div>
  <div aria-label="Product rating">
    <p-rating [ngModel]="product().rating" [readonly]="true" />
  </div>
  </div>
  }@placeholder {
  <div class="w-full h-full flex flex-col gap-2" role="status" aria-label="Loading product information">
  <div class="size-full bg-gray-300 rounded-box"></div>
  <div class="w-full h-full flex flex-col gap-2">
  <div class="w-4/5 h-5 bg-gray-300 rounded-box"></div>
  <div class="w-1/2 h-4 bg-gray-300 rounded-box"></div>
  <div class="w-3/4 h-5 bg-gray-300 rounded-box"></div>
  </div>
  </div>
  }
  </article>
  `,
})
export class ProductCardComponent {
  readonly appStore = inject(AppStore);
  product = input.required<Product>();
}

