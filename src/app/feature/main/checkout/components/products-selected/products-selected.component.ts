import { Component, inject } from '@angular/core';
import { AppStore } from '../../../../../store/app.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-selected',
  imports: [CommonModule],
  template: `
  <ul class="w-full flex flex-col gap-5 h-50 overflow-y-auto" style="scrollbar-width: none;">
  @for (cart of appStore.carts(); track $index) {
  <li class="text-primary flex flex-wrap justify-between items-center text-xs ">

  <div class="flex  items-center  gap-1">
  @let productImage = cart.product.images[0] ;
  
  <div class="size-14">
  <img [src]="productImage.img_url" [alt]="productImage.img_name" loading="lazy" class="size-full object-contain">
  </div>

  <h2 class="w-35 line-clamp-1 capitalize">{{cart.product.title}}</h2>
  </div>

  <div>
  <h3 >{{cart.product.final_price | currency : 'EGP'}}</h3>
  </div>

  </li>
  }
  </ul>
  `,
  styles: ``
})
export class ProductsSelectedComponent {
  readonly appStore = inject(AppStore);
}
