import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { AppStore } from '../../../../../store/app.store';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cart-table',
  imports: [SharedModule],
  providers: [ConfirmationService],
  template: `
  <div class="w-full flex flex-col gap-2 justify-center items-center overflow-x-auto" role="region" aria-label="Shopping Cart Items">
    <header class="w-full hidden md:grid md:grid-cols-5 justify-items-center-safe text-primary font-[500]" role="rowgroup">
      <h1 role="columnheader">Product</h1>
      <h1 role="columnheader">Price</h1>
      <h1 role="columnheader">Quantity</h1>
      <h1 role="columnheader">Subtotal</h1>
      <h1 role="columnheader" class="sr-only">Actions</h1>
    </header>

    <ul class="w-full flex flex-col" role="list">
      @for (cart of appStore.carts(); track cart.id) {
        <li class="w-full flex flex-col md:grid md:grid-cols-5 md:justify-items-center-safe
          gap-4 p-4 bg-gray-50 rounded-lg" role="listitem">
          <!-- Product Section -->
          <div class="flex gap-2 items-center" [routerLink]="['/main/product', cart.product_id]" role="link" tabindex="0">
            @let productImage = cart.product.images[0];
            @if(productImage) {
              <div class="size-15">
                <img [src]="productImage.img_url" 
                     [alt]="productImage.img_name" 
                     class="size-full object-contain"
                     loading="lazy">
              </div>
            }
            <div class="flex flex-col">
              <span class="md:hidden text-primary font-medium">{{cart.product.final_price | currency : 'EGP'}}</span>
            </div>
          </div>
          
          <!-- Price Section - Hidden on mobile -->
          <div class="hidden md:flex gap-2 items-center" role="cell">
            <h2>{{cart.product.final_price | currency : 'EGP'}}</h2>
          </div>

          <!-- Quantity Section -->
          <div class="flex gap-2 items-center" role="cell">
            <button type="button" 
                    class="aspect-square bg-gray-300 size-8 rounded shadow text-center"
                    (click)="appStore.handleEditProductCartModle(cart)"
                    [attr.aria-label]="'Edit quantity for ' + cart.product.title"
                    (keydown.enter)="appStore.handleEditProductCartModle(cart)"
                    (keydown.space)="appStore.handleEditProductCartModle(cart)">
              {{cart.quantity}}
            </button>
          </div>

          <!-- Subtotal Section -->
          <div class="flex gap-2 items-center justify-between md:justify-center" role="cell">
            @let subtotal = cart.product.final_price * cart.quantity;
            <span class="md:hidden text-gray-600">Subtotal:</span>
            <h2 class="font-medium">{{subtotal | currency : 'EGP'}}</h2>
          </div>
        
          <div class="flex gap-4" role="cell">
            <p-button 
              icon="pi pi-pencil" 
              rounded 
              raised 
              severity="info" 
              size="small"
              (click)="appStore.handleEditProductCartModle(cart)"
              [attr.aria-label]="'Edit ' + cart.product.title"
            />
            <p-confirmpopup />
            <p-button 
              icon="pi pi-trash" 
              rounded 
              raised 
              size="small"
              severity="danger" 
              [outlined]="true"
              (click)="confirm($event, cart.id!)"
              [attr.aria-label]="'Remove ' + cart.product.title + ' from cart'"
            />
          </div>
        </li>
        <p-divider/>
      }
    </ul>
  </div>
  `,
})
export class CartTableComponent {
  readonly appStore = inject(AppStore);
  private readonly confirmationService = inject(ConfirmationService);
  
  confirm(event: Event, cartId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to remove this product from your cart?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.appStore.deleteFromCart(cartId);
      },
    });
  }
}
