import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavListItemComponent } from "../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { ProductsSelectedComponent } from "../components/products-selected/products-selected.component";
import { BillingDetailsListComponent } from "../../cart/components/billing-details-list/billing-details-list.component";
import { ApplyCouponComponent } from "../../cart/components/apply-coupon/apply-coupon.component";
import { CashOnDeliveryFormComponent } from "../components/cash-on-delivery-form/cash-on-delivery-form.component";
import { SelectedCheckoutTypeComponent } from "../components/selected-checkout-type/selected-checkout-type.component";
import { ActivatedRoute } from '@angular/router';
import { CheckoutType } from '../interface/checkout.type';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderStore } from '../../../../store/orders/orders.signal';

@Component({
  selector: 'app-checkout',
  imports: [
    NavListItemComponent,
    ProductsSelectedComponent,
    BillingDetailsListComponent,
    ApplyCouponComponent,
    CashOnDeliveryFormComponent,
    SelectedCheckoutTypeComponent
],
  template : `
  <section class="w-full grid grid-cols-1 p-4 gap-4">
  <app-nav-list-item [items]="navLinks()" class="pb-5"/>
  <h1 class="title-h1">Billing Details</h1>

  <main class="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
  <div class="col-span-2">
  @switch (checkoutTypeValue()) {
  @case ('CASH') {
  <app-cash-on-delivery-form/>
  }
  @case ('BANK') {
  <div class="text-secondary">Sorry, bank payment is not supported right now.</div>
  }
  }
  </div>
  
  <div class="grid grid-cols-1 gap-2  shadow shadow-gray-300  p-2">
  <app-products-selected/>
  <app-billing-details-list/>
  <app-selected-checkout-type 
  [checkoutTypeValue]="checkoutTypeValue()"
  (checkoutTypeValueChange)="checkoutTypeValue.set($event)"/>
  <app-apply-coupon/>
  </div>

  </main>

  </section>
  `,
  providers : [OrderStore]
})
export class CheckoutComponent {
  readonly orderStore = inject(OrderStore);
  navLinks = signal<MenuItem[]>([
    {label: 'Home',icon : 'pi pi-home', routerLink: '/main/home'},
    {label: 'View Cart', routerLink: '/main/cart'},
    {label: 'Checkout'}
  ]).asReadonly();

  checkoutTypeValue = signal<CheckoutType>('CASH');

  constructor(private activatedRoute : ActivatedRoute){
  this.getCheckoutType();
  }

  private getCheckoutType() : void {
    this.activatedRoute.paramMap.pipe(
    map((paramMap) => {
    const checkoutTypeValue : CheckoutType = paramMap.get('checkoutType') as CheckoutType;
    if(!checkoutTypeValue) return;
    this.checkoutTypeValue.set(checkoutTypeValue);
    }), takeUntilDestroyed()
    ).subscribe();
  }

}
