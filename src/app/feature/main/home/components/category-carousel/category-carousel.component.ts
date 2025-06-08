import { Component, computed, inject, input } from '@angular/core';
import { AppStore } from '../../../../../store/app.store';
import { Product } from '../../../../../core/interfaces/products.type';
import { ProductsHighlightsComponent } from "../products-highlights/products-highlights.component";
import { HighlightsDetailsComponent } from "../highlights-details/highlights-details.component";

@Component({
  selector: 'app-category-carousel',
  imports: [ProductsHighlightsComponent, HighlightsDetailsComponent],
  template: `
  <app-products-highlights
  [products]="productsCategory()">
  <app-highlights-details
  tagName="Browse By Category"
  [title]="category()"
  path="/main/shop"
  [query]="{category : category()}"
  /> 
  </app-products-highlights>
  `,
})
export class CategoryCarouselComponent {
  category = input<string>('');
  readonly appStore = inject(AppStore);
  productsCategory = computed<Product[]>(() => 
  this.appStore.products().filter((product) => product.category === this.category())
  .sort((a , b) => a.type > b.type ? -1 : 1)
  );
}
