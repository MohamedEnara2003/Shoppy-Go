import { Component, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { HighlightsDetailsComponent } from "../highlights-details/highlights-details.component";
import { CategoriesService } from '../../../../../core/services/categories.service';
@Component({
  selector: 'app-browse-by-category',
  imports: [CarouselModule, HighlightsDetailsComponent],
  template: `
  <section class="w-full flex flex-col justify-center items-center gap-10">
    <app-highlights-details
      tagName="Categories" 
      title="browse By Category"
      class="w-full"/>

    <p-carousel 
      [value]="categoriesServie.categories()" 
      [responsiveOptions]="responsiveOptions"
      [showIndicators]="false"
      [circular]="false" 
      [showNavigators]="true"
      class="w-full">
      
      <ng-template let-category #item>
        @defer (on viewport) {
          <div class="w-full aspect-square rounded-b-lg flex justify-center items-center border-b-2 border-b-secondary  
            hover:opacity-80 duration-200 transition-color cursor-pointer p-4">
            <img 
              [src]="category.img_url" 
              [alt]="category.name" 
              class="w-full h-full object-contain"
              loading="lazy"
              width="200"
              height="200"
              decoding="async"
              fetchpriority="low">
          </div>
        } @placeholder {
          <div class="w-full aspect-square bg-neutral-200 animate-pulse rounded-b-lg flex items-center justify-center">
            <div class="w-16 h-16 bg-neutral-300 rounded-full"></div>
          </div>
        }
      </ng-template>
    </p-carousel>
  </section>
  `,
  styles: ``
})
export class BrowseByCategoryComponent {
  protected readonly categoriesServie = inject(CategoriesService)
  responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '370px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '375px',
        numVisible: 1,
        numScroll: 1,
    },
];
  
}
