import { Component, inject } from '@angular/core';
import { MainCarouselComponent } from "../components/main-carousel/main-carousel.component";
import { ListCategoriesComponent } from "../../../../shared/components/list-categories/list-categories.component";
import { BrowseByCategoryComponent } from "../components/browse-by-category/browse-by-category.component";
import { ServiceHighlightsComponent } from "../components/service-highlights/service-highlights.component";
import { NewArrivalComponent } from "../components/new-arrival/new-arrival.component";
import { CategoryCarouselComponent } from "../components/category-carousel/category-carousel.component";
import { AppStore } from '../../../../store/app.store';

@Component({
  selector: 'app-home',
  imports: [
    MainCarouselComponent,
    ListCategoriesComponent,
    BrowseByCategoryComponent,
    ServiceHighlightsComponent,
    NewArrivalComponent,
    CategoryCarouselComponent
  ],
  template: `
    <main class="w-full flex flex-col justify-center gap-5" role="main">

      <section class="w-full flex-col flex md:flex-row justify-between gap-2 mt-2 md:mt-5" 
      aria-label="Main content area">  
        <nav class="w-full md:w-[25%]" aria-label="Category navigation">
          <app-list-categories />
        </nav>
        <app-main-carousel class="w-full md:w-[75%]" aria-label="Featured products carousel"/>
      </section>
      
      <section aria-label="Category products" class="grid grid-cols-1 gap-5">
        @for (category of appStore.categories(); track category) {
          <app-category-carousel 
            [category]="category"
            [attr.aria-label]="'Products in ' + category"
          />
        }
      </section>

      <section aria-label="Browse by category">
        <app-browse-by-category />
      </section>

      <section aria-label="Service highlights">
        <app-service-highlights/>
      </section>

      <section aria-label="New arrivals">
        <app-new-arrival/>
      </section>
    </main>
  `,
})
export class HomeComponent {
  readonly appStore = inject(AppStore);
}
