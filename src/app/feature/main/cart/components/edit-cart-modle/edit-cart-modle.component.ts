import { Component, inject, linkedSignal, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppStore } from '../../../../../store/app.store';
import { QuantityFieldComponent } from "../../../../../shared/components/quantity-field/quantity-field.component";
import { ContainerSizesComponent } from "../../../products/components/container-sizes/container-sizes.component";
import { ProductSize } from '../../../../../core/interfaces/products.type';

@Component({
  selector: 'app-edit-cart-modle',
  standalone: true,
  imports: [CommonModule, FormsModule, QuantityFieldComponent, ContainerSizesComponent],
  template: `
    <section class="w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center p-4">
      <!-- Backdrop -->
      <div class="size-full bg-black/50 fixed top-0 left-0" 
      (click)="appStore.handleEditProductCartModle(null)"></div>
    
      <!-- Modal -->
      <div class="w-full max-w-lg z-20">
        <div class="bg-white rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 max-h-[90vh] ">
      
          <header class="w-full flex items-center justify-between sticky top-0 bg-white py-2 z-10">
            <h2 class="text-xl sm:text-2xl font-semibold text-secondary">Edit Cart Item</h2>
            <button (click)="appStore.handleEditProductCartModle(null)"
            class="text-gray-400 hover:text-gray-500 transition-colors p-1">
              <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            @let cart = appStore.updatingCart();
            @if(cart){
              @let productImage = cart.product.images[0];
              <div class="w-full h-50 aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img [src]="productImage.img_url" 
                    [alt]="productImage.img_name"
                    class="w-full h-full object-contain hover:scale-105 transition-transform duration-300">
              </div>

              <div class="flex flex-col gap-3 sm:gap-4">
                <div class="space-y-1 sm:space-y-2">
                  <h3 class="text-sm sm:text-base font-medium text-primary line-clamp-2">{{cart.product.title}}</h3>
                </div>

                <div class="space-y-3 sm:space-y-4">
                  <div class="flex flex-col gap-2">
                    <app-container-sizes [sizes]="cart.product.sizes" 
                    [initialSize]="selectNewSize()"
                    (initialSizeChange)="selectNewSize.set($event!)"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <h1 class="text-sm font-medium text-primary/70">Quantity</h1>
                    <app-quantity-field 
                      [max]="maxStock()" 
                      [value]="selectNewQuantity()" 
                      (valueChange)="selectNewQuantity.set($event)"
                      class="w-full max-w-[200px]"/>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="w-full flex justify-end gap-3 pt-3 sm:pt-4 border-t mt-2 sticky bottom-0 bg-white ">
            <button type="button"
              class="px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              (click)="appStore.handleEditProductCartModle(null)">
              Cancel
            </button>
            <button type="submit"
              class="px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-white bg-primary border border-transparent rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              (click)="appStore.saveCartChanges(selectNewQuantity() , selectNewSize())">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class EditCartModleComponent {
  readonly appStore = inject(AppStore);

  selectNewSize = linkedSignal<ProductSize>(() => {
  const defaultSize = this.appStore.updatingCart()?.product.sizes[0] ;
  return  this.appStore.updatingCart()?.size || defaultSize!
  });

  selectNewQuantity= linkedSignal<number>(() => this.appStore.updatingCart()?.quantity ?? 1);

  maxStock = linkedSignal<number>(() => {
    const cart = this.appStore.updatingCart();
    if (!cart) return 1;

    const size_stock = cart.size?.size_stock;
    const productStock = cart.product.stock;
    if (size_stock) {
    return size_stock;
    } else if (productStock) {
    return productStock;
    }
    return 0;
  });


}
