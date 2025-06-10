import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-highlights-details',
  imports: [RouterModule],
  template: `
  <header class="w-full flex flex-col gap-2">
  <h2 class="flex items-center gap-2 capitalize font-medium text-gray-800">
  <span class="h-8 w-4 bg-secondary rounded-sm "></span>
  {{tagName()}}
  </h2>
  <div class="flex flex-wrap justify-between items-center">
  @if(title()){
  <h1 class="title-h1 text-gray-900">{{title()}}</h1>
  }
@if (path()) {
  <button [routerLink]="path()" [queryParams]="query()" type="button"
  class="btn-secondary text-xs sm:text-sm sm:p-2 text-white">
  View All Products
</button>
}
  </div>
  </header>
  `,
  styles: ``
})
export class HighlightsDetailsComponent {
  tagName = input<string>();
  title = input<string>();
  path = input<string>();
  query = input<{category : string | null}>();
}
