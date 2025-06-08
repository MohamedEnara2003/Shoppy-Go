import { Component, inject, signal } from '@angular/core';
import { DashboardTableComponent } from "../components/dashboard-table/dashboard-table.component";
import { UpsertProductComponent } from "../components/upsert-product/upsert-product.component";
import { AppStore } from '../../../../store/app.store';
import { ButtonModule } from 'primeng/button';
import { ProductsAnalyticsComponent } from "../components/products-analytics/products-analytics.component";

@Component({
  selector: 'app-dashboard-products',
  imports: [
    DashboardTableComponent,
    UpsertProductComponent,
    ButtonModule,
    ProductsAnalyticsComponent
],
  template: `
    <main role="main" aria-label="Products Dashboard" class="w-full flex flex-col">
      <section aria-label="Products Analytics" class="w-full">
        <app-products-analytics />
      </section>

      <section aria-label="Product Actions" class="w-full">
        <p-button 
          routerLink="choose-category" 
          severity="success"  
          icon="pi pi-plus" 
          label="Create Product" 
          size="small" 
          class="px-4"
          aria-label="Create new product"
        />
      </section>

      <section aria-label="Products Table" class="w-full">
        <app-dashboard-table />
      </section>
      
      @if(appStore.isUpsertProduct()){
        <app-upsert-product />
      }
    </main>
  `,
})
export class DashboardProductsComponent {
  readonly appStore = inject(AppStore);
  openUpsertProduct = signal<boolean>(false);
}
