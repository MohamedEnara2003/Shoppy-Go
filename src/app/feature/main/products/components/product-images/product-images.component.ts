import { Component, input, linkedSignal, HostListener, signal } from '@angular/core';
import { ProductImagesType } from '../../../../../core/interfaces/products.type';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-product-images',
  imports: [SharedModule , CarouselModule],
  template: `

<figure class="w-full flex flex-col lg:flex-row justify-center items-center gap-5 ">

<section class="w-full md:w-auto" role="tablist" aria-label="Product image thumbnails"> 

    <p-carousel [value]="images()"  [responsiveOptions]="responsiveOptions"
    verticalViewPortHeight="370px" 
    [showIndicators]="false"
    [orientation]="this.isMobile() ? 'horizontal' : 'vertical'" >
    <ng-template let-item #item>
    <div (click)="currentImage.set(item)" (keydown.enter)="currentImage.set(item)"
      (keydown.space)="currentImage.set(item)"
      role="tab"
      [attr.aria-selected]="item.img_name === currentImage().img_name"
      [attr.aria-label]="'View ' + item.img_name"
      tabindex="0"
      class="rounded-sm w-full h-20 cursor-pointer flex justify-center border border-primary/10 p-1 focus:outline-none focus:ring-2 focus:ring-secondary"
      [ngClass]="item.img_name === currentImage().img_name ? 'border-secondary' : ''">
      @defer (on viewport) {
      <img [src]="item.img_url" 
      [alt]="item.img_name" 
      loading="lazy"
      class="size-full object-contain"
      [attr.aria-hidden]="true">
      }
    @placeholder {
    <div class="flex items-center justify-center size-full" role="status" aria-label="Loading image">
      <p-progress-spinner fill="transparent" animationDuration=".5s" 
      [style]="{ width: '50px', height: '50px' }" />
    </div>
    }
    </div>
    </ng-template>
</p-carousel>
</section>

  <section class="size-80 md:size-100 overflow-hidden" role="tabpanel" 
  [attr.aria-label]="'Current product image: ' + currentImage().img_name">  
  @defer (on viewport) { 
  @if(currentImage()){
    <img [src]="currentImage().img_url" 
    [alt]="currentImage().img_name" 
    loading="lazy"
    class="size-full object-contain animate-sideUp"
    [attr.aria-hidden]="true">
  }
}@placeholder {
    <div class="flex items-center justify-center size-full" role="status" aria-label="Loading image">
      <p-progress-spinner fill="transparent" animationDuration=".5s" 
        [style]="{ width: '80px', height: '80px' }" />
    </div>
  }
  </section>
</figure>

  `,
})

export class ProductImagesComponent {
  images = input.required<ProductImagesType[]>();
  
  currentImage = linkedSignal<ProductImagesType>(() => {
    const images = this.images();
    if (!images || images.length === 0) {
      return {img_url: '', img_name: ''};
    }
    return images[0];
  });

  isMobile = signal<boolean>(false);

  @HostListener('window:resize', ['$event'])
  
  onResize() {
    this.isMobile.set(window.innerWidth < 1050) ;
  }

  ngOnInit() {
    this.onResize();
  }

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
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1
    }
]

}
