import { Component, computed, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavListItemComponent } from "../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { ProductCardComponent } from "../../products/components/product-card/product-card.component";
import { AppStore } from '../../../../store/app.store';
import { MsgEmptyComponent } from "../../../../shared/components/msg-empty/msg-empty.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, NavListItemComponent, ProductCardComponent, MsgEmptyComponent],
  template: `
  <section class="w-full grid grid-cols-1" role="main" aria-label="Wishlist">
    <app-nav-list-item [items]="navLinks()" aria-label="Navigation"/>

    @if(this.appStore.wishlist().length > 0){
      <ul class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center-safe gap-4" 
          role="list" 
          aria-label="Wishlist items">
        @for (product of appStore.wishlist(); track product.id) {
          <li role="listitem">
            <app-product-card [product]="product"/>
          </li>
        }
      </ul>
    }@else {
      <app-msg-empty msgEmpty="Your Wishlist is Empty!" />
    }
  </section>
  `,
})
export class WishlistComponent {
  readonly appStore = inject(AppStore);
  
  navLinks = computed<MenuItem[]>(() => [
    {label: 'Home', routerLink: '/main/home'},
    {label: `${this.appStore.wishlist().length} Wishlist`}
  ]);
}
