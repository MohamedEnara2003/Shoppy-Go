import { Component, computed, inject, input } from '@angular/core';
import { AnalyticsCardComponent } from "../../../../components/analytics-card/analytics-card.component";
import { AppStore } from '../../../../../store/app.store';
import { analyticsType } from '../../../../interfaces/analytics.type';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-analytics',
  imports: [AnalyticsCardComponent],
  template: `
    <section class="w-full grid grid-cols-2 md:grid-cols-3 gap-5 p-4" role="region" aria-label="Products Analytics">
      <h2 class="sr-only">Products Analytics Overview</h2>
      @for (list of productsAnalyticsList(); track list) {
        <article role="article" [attr.aria-label]="list.title + ' analytics'">
          <app-analytics-card
            [title]="list.title"
            [count]="list.count"
            [icon]="list.icon!"
          />
        </article>
      }
    </section>
  `,
  providers: [CurrencyPipe]
})
export class ProductsAnalyticsComponent {
  private readonly appStore = inject(AppStore);
  private readonly currencyPipe = inject(CurrencyPipe)
  productsAnalyticsList = computed<analyticsType[]>(() => {
    const productStore = this.appStore;
    return [
      {title: 'Total Products', count: productStore.products().length, icon: 'pi-box'},
      {title: 'Total Categories', count: productStore.categories().length, icon: 'pi-box'},
      {title: 'Total Types', count: productStore.types().length, icon: 'pi-box'},
      {title: 'Products Min Price', count: (this.currencyPipe.transform(productStore.minPrice(),'EGP') || '0 EGP')},
      {title: 'Products Max Price', count: (this.currencyPipe.transform(productStore.maxPrice(),'EGP') || '0 EGP')},
      {title: 'Products Total Prices', count: 
        (this.currencyPipe.transform(productStore.productsTotalPrices(),'EGP') || '0 EGP')
      },
    ]
  });
}
