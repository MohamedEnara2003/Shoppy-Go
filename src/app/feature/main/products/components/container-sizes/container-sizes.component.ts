import { Component, inject, input, model } from '@angular/core';
import { ProductSize } from '../../../../../core/interfaces/products.type';
import { CommonModule } from '@angular/common';
import { AppStore } from '../../../../../store/app.store';

@Component({
  selector: 'app-container-sizes',
  imports: [CommonModule],
  template: `
  @if(sizes()?.length! > 0){
  <div class="flex flex-col gap-2">
  <h1 class="font-medium text-primary/70">Size:</h1>
  <ul class="flex gap-2">
  @for (item of sizes(); track item.size_type) {
  <li (click)="selectSize(item)" 
  class="size-7 text-xs border border-primary flex justify-center items-center rounded  uppercase
  font-semibold  duration-200 transition-all hover:bg-secondary hover:text-white"
  [ngClass]="initialSize()?.size_type === item.size_type ? 'bg-secondary text-white cursor-pointer' : 
  item.size_stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'cursor-pointer'
  ">
  <a>{{item.size_type}}</a>
  </li>
  }
  </ul>
  </div>
  }`,
})
export class ContainerSizesComponent {
  readonly appStore = inject(AppStore);
  initialSize = model<ProductSize>();
  sizes = input<ProductSize[]>();

  selectSize(size : ProductSize) : void {
    if(size.size_stock === 0) {
    return;
    }
    this.initialSize.set(size);
    this.appStore.quantityChange(1);
  }
}
