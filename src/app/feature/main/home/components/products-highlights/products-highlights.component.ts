import { Component, input } from '@angular/core';
import { Product } from '../../../../../core/interfaces/products.type';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-products-highlights',
  standalone: true,
  imports: [ProductCardComponent, CarouselModule],
  template: `
    <section 
      class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      aria-label="Featured Products"
    >
      <ng-content/>
      <div class="relative">
        <p-carousel 
          [value]="products()" 
          [responsiveOptions]="responsiveOptions"
          [showIndicators]="false"
          [showNavigators]="true">
          <ng-template let-product pTemplate="item">
            <div class="p-2">
              <app-product-card 
                [product]="product"
                class="h-full transition-transform duration-300 hover:scale-105"
              />
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
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    }
  ];
}
