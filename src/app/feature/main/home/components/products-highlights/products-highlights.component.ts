import { Component, input } from '@angular/core';
import { Product } from '../../../../../core/interfaces/products.type';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-products-highlights',
  imports: [ProductCardComponent, CarouselModule],
  template: `
    <section class="w-full "
      aria-label="Featured Products">
      <ng-content/>
      <div >
        <p-carousel 
          [numVisible]="3" [numScroll]="3" [circular]="false"
          [value]="products()" 
          [responsiveOptions]="responsiveOptions"
          [showIndicators]="false"
          [showNavigators]="true">
          <ng-template let-product pTemplate="item">
            <div class="p-2">
              <app-product-card [product]="product" />
            </div>
          </ng-template>
        </p-carousel>
      </div>
    </section>
  `,

})
export class ProductsHighlightsComponent {
  products = input.required<Product[]>();
  
  responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]
}
