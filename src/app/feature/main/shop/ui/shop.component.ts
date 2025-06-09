import { Component, inject } from '@angular/core';
import { AsideProductsFilteringComponent } from "../components/aside-products-filtering/aside-products-filtering.component";
import { ProductCardComponent } from "../../products/components/product-card/product-card.component";
import { PaginatorModule,  } from 'primeng/paginator';
import { AppStore } from '../../../../store/app.store';
import { PaginatorService } from '../../../../core/services/paginator.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [
    AsideProductsFilteringComponent,
    ProductCardComponent,
    PaginatorModule,
    RouterModule
  ],
  template: `
  <section class="w-full grid grid-cols-1 gap-5">

    <header class="w-full h-[30vh] bg-[#0D0D0D] flex justify-center items-center">
    <h1 class="title-h1 text-white text-4xl">shop</h1>
    </header>

    <div class=" grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-5 "> 
    <app-aside-products-filtering class="w-full"/>
    
    <main class="w-full col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5">
      @for (product of appStore.filteringProducts(); track product.id) {
      <app-product-card [product]="product"/>
      }@empty {
        <div class="col-span-3 flex flex-col items-center justify-start gap-5 p-2 h-120">
          <p class="text-lg text-secondary">No products found matching your filters</p>
          <button 
            (click)="appStore.getFilteringQueries('', '', ''); appStore.getMinAndMaxPrice(appStore.products())"
            [routerLink]="['/main/shop']"
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Remove Filters
          </button>
        </div>
      }
    <div class="w-full card flex justify-center  col-span-1 md:col-span-3 2xl:col-span-4">
      <p-paginator 
        (onPageChange)="paginatorService.onPageChange($event)" 
        [first]="paginatorService.first()" 
        [rows]="paginatorService.rows()" 
        [totalRecords]="appStore.products().length" 
        [rowsPerPageOptions]="[10, 20, 30]" 
      />
    </div>
    </main>
    </div>

  </section>
  `,
})
export class ShopComponent {
readonly paginatorService = inject(PaginatorService);
readonly appStore = inject(AppStore);
}
