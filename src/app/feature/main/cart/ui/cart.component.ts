import { Component, computed, inject } from '@angular/core';
import { NavListItemComponent } from "../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { MenuItem } from 'primeng/api';
import { CartTableComponent } from "../components/cart-table/cart-table.component";
import { ApplyCouponComponent } from "../components/apply-coupon/apply-coupon.component";
import { CartTotalCardComponent } from "../components/cart-total-card/cart-total-card.component";
import { AppStore } from '../../../../store/app.store';
import { MsgEmptyComponent } from "../../../../shared/components/msg-empty/msg-empty.component";
import { EditCartModleComponent } from "../components/edit-cart-modle/edit-cart-modle.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-cart',
  imports: [
    ProgressSpinnerModule ,
    NavListItemComponent,
    CartTableComponent,
    ApplyCouponComponent,
    CartTotalCardComponent,
    MsgEmptyComponent,
    EditCartModleComponent
],
  template: `
  <section class="w-full grid grid-cols-1">

  <app-nav-list-item [items]="navLinks()" />

  @if(appStore.cartLoading()){
        <div class="w-full h-80 flex justify-center items-center" 
            role="status"
            aria-label="Loading orders">
          <p-progress-spinner 
            strokeWidth="8" 
            fill="transparent" 
            animationDuration=".5s" 
            [style]="{ width: '70px', height: '70px' }" 
            aria-label="Loading spinner"/>
        </div>
    }

  @else if (appStore.cartsCount() === 0 && !appStore.cartLoading()){
  <app-msg-empty msgEmpty=" Your Cart is Empty!" />
  }

  @else if (appStore.cartsCount() > 0 && !appStore.cartLoading()){
  <app-cart-table class="w-full" />
  <div class="w-full flex flex-col gap-5"> 
  <div class="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
  <button type="button" class="btn-secondary bg-transparent text-primary/80 border-primary/20 text-sm
  shadow-none">
  Return To Shop
  </button>
  <app-apply-coupon />
  </div>
  <div class="w-full flex justify-end ">
    <app-cart-total-card/>
  </div>
  </div>
  }

  @if(appStore.updatingCart()){
  <app-edit-cart-modle />
  }
  </section>
  `,
})
export class CartComponent {

  readonly appStore  = inject(AppStore);

  navLinks = computed<MenuItem[]>(() => [
    {label: 'Home', routerLink: '/main/home'},
    {label: `Your Cart ${this.appStore.cartsCount()}`}
  ]);

}
