import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { NavListItemComponent } from "../../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { AppStore } from '../../../../../store/app.store';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductImagesComponent } from "../../components/product-images/product-images.component";
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { ContainerSizesComponent } from "../../components/container-sizes/container-sizes.component";
import { QuantityFieldComponent } from "../../../../../shared/components/quantity-field/quantity-field.component";
import { BtnAddToCartComponent } from "../../components/btn-add-to-cart/btn-add-to-cart.component";
import { ServiceDetailsComponent } from "../../components/service-details/service-details.component";
import { Product, ProductSize } from '../../../../../core/interfaces/products.type';
import { ProductsHighlightsComponent } from "../../../home/components/products-highlights/products-highlights.component";
import { HighlightsDetailsComponent } from "../../../home/components/highlights-details/highlights-details.component";
import { ProductReviewsComponent } from "../../components/product-reviews/product-reviews.component";

@Component({
  selector: 'app-product-details',
  imports: [
    SharedModule,
    NavListItemComponent,
    ProductImagesComponent,
    ContainerSizesComponent,
    QuantityFieldComponent,
    BtnAddToCartComponent,
    ServiceDetailsComponent,
    ProductsHighlightsComponent,
    HighlightsDetailsComponent,
    ProductReviewsComponent
  ],
  template: `
  <main class="w-full mx-auto px-2 sm:px-4 py-4 sm:py-8 grid gap-4 sm:gap-8">
    <nav aria-label="Breadcrumb navigation">
      <app-nav-list-item [items]="items()" class="w-full bg-white rounded-lg shadow-sm capitalize" />
    </nav>

    <div class="w-full grid md:grid-cols-2 gap-4 sm:gap-8 bg-white rounded-lg shadow-sm">
      <section aria-label="Product Images">
        <app-product-images [images]="appStore.product()?.images!" class="rounded-lg overflow-hidden"/>
      </section>

      <article aria-label="Product Details" class="w-full flex flex-col gap-3 text-primary p-1">
        <header class="space-y-1 sm:space-y-2">
          <h1 class="text-xl sm:text-2xl font-bold text-secondary">{{appStore.product()?.brand}}</h1>
          <h2 class="text-2xl sm:text-3xl font-bold">{{appStore.product()?.title}}</h2>
        </header>

        <div class="flex flex-wrap items-center gap-2 sm:gap-4" role="group" aria-label="Product Rating and Status">
          <p-rating [ngModel]="appStore.product()?.rating" [readonly]="true" class="text-yellow-400" aria-label="Product Rating" />
          <span class="text-xs sm:text-sm text-gray-600">(150 Reviews)</span>
          <span class="font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full" 
              [ngClass]="appStore.product()?.stock_status === 'INSTOCK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              role="status"
              aria-label="Stock Status">
            {{appStore.product()?.stock_status}}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-1" role="group" aria-label="Product Color">
          <h3 class="font-medium text-sm sm:text-base text-primary">Colors:</h3>
          <span class="text-xs sm:text-sm capitalize py-1 bg-gray-100 rounded-full">
            {{appStore.product()?.color}}
          </span>
        </div>

        <div class="flex gap-4" role="group" aria-label="Product Pricing">
          <span class="text-secondary font-bold" aria-label="Final Price">
            {{appStore.product()?.final_price | currency : 'EGP' }}
          </span>
          @if(appStore.product()?.final_price !== appStore.product()?.price ){
            <span class="line-through" aria-label="Original Price">
              {{appStore.product()?.price | currency : 'EGP' }}
            </span>
          }
        </div>

        @if(appStore.product()?.sizes?.length! > 0){
          <section aria-label="Product Sizes">
            <app-container-sizes [sizes]="appStore.product()?.sizes" 
              [initialSize]="selectedSize()" 
              (initialSizeChange)="selectedSize.set($event!)"
              class="border-t border-b border-gray-200 py-3 sm:py-4"/>
          </section>
        }

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          @let stock = appStore.product()?.sizes?.length === 0 ?  (appStore.product()?.stock ?? 10): 
          (selectedSize().size_stock || 10)  ; 
          
          <section aria-label="Quantity Selection">
            <app-quantity-field [value]="appStore.quantity()" [max]="stock" 
              (valueChange)="appStore.quantityChange($event)"
              class="border border-gray-200 rounded-lg"/>
          </section>

          <div class="flex justify-center items-center gap-2">
            <button type="button" 
                class="w-full bg-secondary hover:bg-secondary/90 text-white text-sm sm:text-base font-medium py-2 px-2 sm:px-4 rounded-lg transition-colors"
                aria-label="Buy Now">
                Buy Now
            </button>

            <button (click)="appStore.toggleWishlist(appStore.product()!)" 
              type="button" 
              class="size-8 sm:size-10 border border-gray-200 hover:border-secondary flex rounded-lg justify-center items-center cursor-pointer transition-colors"
              [attr.aria-label]="appStore.isInWishlist(appStore.product()!) ? 'Remove from wishlist' : 'Add to wishlist'"
              [attr.aria-pressed]="appStore.isInWishlist(appStore.product()!)">
              <i class="pi text-base sm:text-lg"
                [ngClass]="appStore.isInWishlist(appStore.product()!) ? 'pi-heart-fill text-secondary' : 'pi-heart' "></i>
            </button>
          </div>
        </div>

        <section aria-label="Add to Cart">
          <app-btn-add-to-cart class="w-full" 
            [product]="appStore.product()!" [selectSize]="selectedSize()"
          />
        </section>

        <section aria-label="Service Details">
          <app-service-details class="w-full border-t border-gray-200 pt-4 sm:pt-6"/>
        </section>
      </article>
    </div>
    
    @if(appStore.product()?.description){
      <section class="bg-white rounded-lg shadow-sm p-3 sm:p-6 space-y-3 sm:space-y-4" aria-label="Product Information">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Product Information</h2>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{appStore.product()?.description}}</p>
      </section>
    }

    <section aria-label="Product Reviews">
      <app-product-reviews class="bg-white rounded-lg shadow-sm p-3 sm:p-6"/>
    </section>

    <section aria-label="Related Products">
      <app-products-highlights [products]="relatedProduct()" class="bg-white rounded-lg shadow-sm p-3 sm:p-6">
        <app-highlights-details tagName="Related Items"/>
      </app-products-highlights>
    </section>
  </main>
  `,
})
export class ProductDetailsComponent  {
  protected readonly  appStore = inject(AppStore);
  private activatedRoute = inject(ActivatedRoute);

  selectedSize = linkedSignal<ProductSize>(() => {
    const sizes = this.appStore.product()?.sizes;
    if (!sizes || sizes.length === 0) {
    return {size_id: 0 , size_type: '', size_stock: 0 };
    }
    return sizes[0];
  });
  
  maxStock = computed<number>(() => 
  this.appStore.product()?.sizes?.length === 0 ?  (this.appStore.product()?.stock ?? 10): 
  (this.selectedSize().size_stock || 10) 
  )

  items = linkedSignal<MenuItem[]>(() => [
    { label : 'Home', icon: 'pi pi-home', routerLink: '/' },
    {label: this.appStore.product()?.category, routerLink: '/main/shop',
    queryParams : {category : this.appStore.product()?.category}
    },
    {label: this.appStore.product()?.type, routerLink: '/main/shop',
    queryParams : {type : this.appStore.product()?.type}
    },
  ]);

  protected relatedProduct = signal<Product[]>([]);

  constructor(){
  this.getProductPathId();
  effect(() => {
  this.getRelatedProduct()
  })
  }

  private getProductPathId() : void {
  this.activatedRoute.paramMap.pipe(
  map((paramMap) => {
  const id = paramMap.get('id');
  if(id){
  this.appStore.getProductById(id);
  }
  }), takeUntilDestroyed()
  ).subscribe();
  }
  
  private getRelatedProduct() : void {
  const type = this.appStore.product()?.type ;
  if(type) {
  const relatedProduct = this.appStore.products().filter((product) => product.type === type);
  this.relatedProduct.set(relatedProduct)
  };
  }

}
