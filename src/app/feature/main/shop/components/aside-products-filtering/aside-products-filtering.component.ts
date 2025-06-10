import { Component, computed, inject, signal } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { AppStore } from '../../../../../store/app.store';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-aside-products-filtering',
  imports: [SharedModule],
  template: `
  <section > 
    
  <button (click)="isLoad.set(!isLoad())"
  type="button" class=" cursor-pointer hover:text-primary/70 duration-200 transition-colors p-2">
  <i class="pi pi-bars" [style]="{fontSize : '1.2rem'}"></i>
  </button>
  @defer (on viewport) {
  <aside class="p-3  sm:w-full duration-500  rounded animate-sideLeft sm:animate-none"
  [ngClass]="isLoad() ? 
  'pb-10  w-[85%] fixed sm:relative h-screen sm:h-auto top-0 left-0 overflow-y-auto  bg-white z-[100]' 
  : 'hidden  sm:inline-block'" style="scrollbar-width: none;">

  <button (click)="isLoad.set(!isLoad())"
  type="button" class="sm:hidden cursor-pointer hover:text-primary/70 duration-200 transition-colors py-1">
  <i class="pi pi-times" [style]="{fontSize : '1.2rem'}"></i>
  </button>

  <nav class="grid grid-cols-1 gap-5">
  <div class="flex flex-col gap-2">
  <h1 class="title-h1">By Product Category</h1>
  <ul class="w-full h-35 overflow-y-auto flex flex-col gap-1"> 
  @for (category of appStore.categories() ; track category) {
  @if(category) {
  <li class="flex item-center gap-2" >

  <p-checkbox   
  [inputId]="category"
  [binary]="true"
  [value]="category" 
  [ngModel]="this.category() === category"
  (onChange)="selectQueryCategory(category)"
  /> 

  <label [for]="category" 
  class="capitalize text-primary">{{category}}
  </label>
  </li>
  }
  }
  </ul>
  </div>

  <div class="flex flex-col gap-2">
  <h1 class="title-h1">By Product Type</h1>
  <ul class="w-full h-35 overflow-y-auto flex flex-col gap-1"> 
  @for (type of appStore.types(); track type) {
  @if(type) {
  <li class="flex item-center gap-2">
  <p-checkbox   
  [inputId]="type"
  [binary]="true"
  [value]="type" 
  [ngModel]="this.type() === type"
  (onChange)="selectQueryType(type)"
  /> 
  <label [for]="type" 
  class="capitalize text-primary">{{type}}</label>
  </li>
  }
  }
  </ul>
  </div>

  <div class="flex flex-col gap-2">
  <h1 class="title-h1">By Product Brand</h1>
  <ul class="w-full h-35 overflow-y-auto flex flex-col gap-1"> 
  @for (brand of appStore.brands() ; track brand) {
  @if(brand) {
  <li class="flex item-center gap-2" >
  <p-checkbox   
  [inputId]="brand"
  [binary]="true"
  [value]="brand" 
  [ngModel]="this.brand() === brand"
  (onChange)="selectQueryBrand(brand)"
  /> 
  <label [for]="brand" 
  class="capitalize text-primary">{{brand}}</label>
  </li>
  }
  }
  </ul>
  </div>

  <div class="flex flex-col gap-4">

  <ngx-slider 
  [value]="appStore.minPrice()"
  [highValue]="appStore.maxPrice()" 
  [options]="options()" 
  (userChange)="appStore.onChagePriceRange([$event.value, $event.highValue ?? 100000])" />
  <div class="grid grid-cols-2 gap-2 sm:gap-5">
  <div class="w-full">
<p-floatlabel variant="on">
  <p-inputnumber 
  [ngModel]="appStore.minPrice()" 
  (ngModelChange)="appStore.onChagePriceRange([$event , appStore.maxPrice()])"
  inputId="on_label" mode="currency"
    currency="USD" locale="en-US"  size="small"/>
    <label for="on_label">Min Price</label>
</p-floatlabel>
  </div>

  <div class="w-full">
  <p-floatlabel variant="on">
    <p-inputnumber 
    [ngModel]="appStore.maxPrice()" 
    (ngModelChange)="appStore.onChagePriceRange([appStore.minPrice() , $event])"
    inputId="on_label" mode="currency"
    currency="USD" locale="en-US"  size="small"/>
    <label for="on_label">Max Price</label>
</p-floatlabel>
  </div>

  </div>
  </div>

  </nav>
  </aside>
}@placeholder {
  <div class="w-full h-screen"></div>
}
  @if(isLoad()){
  <div (click)="isLoad.set(!isLoad())" class="w-full h-screen bg-primary/50 fixed top-0 left-0 z-50"></div>
  }

  </section>
  `,
})
export class AsideProductsFilteringComponent {
  isLoad = signal<boolean>(false);

  options = computed<Options>(() => ({
    floor: this.appStore.minPrice() ?? 0,
    ceil: this.appStore.maxPrice() ?? 100,
    step: 1,

    selectionBarGradient: {
      from: '#3B82F6',
      to: '#3B82F6'
    },
    getPointerColor: () => 'var(--color-secondary)',
    getSelectionBarColor: () => 'var(--color-secondary)',
    getTickColor: () => 'var(--color-primary)',
  }))

  readonly appStore = inject(AppStore);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  
  category = signal<string>('');
  type = signal<string>('');
  brand = signal<string>('');

  constructor(){
  this.getQueries();
  }

  private getQueries() : void {
    this.activatedRoute.queryParams.pipe(
      map((params) => {
        const category = params['category'] || '';
        const type = params['type'] || '';
        const brand = params['brand'] || '';
        this.appStore.getFilteringQueries(category , type ,brand);
        this.category.set(category);
        this.type.set(type);
        this.brand.set(brand);
      }), takeUntilDestroyed()
    ).subscribe()
  }

  selectQueryCategory(value : string) : void {
  const category = this.category() === value ? null : value ;
  this.router.navigate(['/main/shop'],{queryParams : {category} , queryParamsHandling : 'merge'},)
  this.category.set(this.brand() === value ? '' : value);
  }

  selectQueryType(value : string) : void {
  const type = this.type() === value ? null : value ;
  this.router.navigate(['/main/shop'],{queryParams : {type} , queryParamsHandling : 'merge'})
  this.type.set(this.type() === value ? '' : value);
  }

  selectQueryBrand(value : string) : void {
  const brand = this.brand() === value ? null : value ;
  this.router.navigate(['/main/shop'],{queryParams : {brand} ,  queryParamsHandling : 'merge'})
  this.brand.set(this.brand() === value ? '' : value);
  }
  
}


