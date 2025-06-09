import { Component, inject, input } from '@angular/core';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Product, ProductSize } from '../../../../../core/interfaces/products.type';
import { AppStore } from '../../../../../store/app.store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-btn-add-to-cart',
  imports: [Button , Ripple],
  template: `
  
  <p-button label="add to cart" pRipple  icon="pi pi-cart-plus" [raised]="true" 
  [style]="{backgroundColor : 'var(--color-primary)' , border : 'transparent'}"
  [disabled]="!product() || product().stock_status === 'OUTSTOCK'"
  styleClass="size-full capitalize " class="size-full hover:opacity-90 duration-200 transition-opacity" 
  (onClick)="addToCart()"/>
  `,
})
export class BtnAddToCartComponent {
  readonly appStore = inject(AppStore);
  readonly router = inject(Router);

  product = input.required<Product>();
  selectSize = input.required<ProductSize>();
  
  addToCart() : void {``
  const userId =  this.appStore.currentUser()?.id ;
  const product =  this.product() ;

  if(product && userId) {
  this.appStore.addToCart( product, userId , product.stock! , this.selectSize());
  return ;
  }
  this.router.navigate(['/main/auth/sign-up']);
  }
  
}
