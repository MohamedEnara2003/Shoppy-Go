import { Component, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule],
  template: `
<p-carousel [value]="mainImages()" [numVisible]="1" [numScroll]="1" 
[circular]="true" [showNavigators]="false" [autoplayInterval]="3000"> 
<ng-template let-value #item>
    <div class="w-full h-[40vh] sm:h-[60vh] bg-black flex justify-between items-center relative">
        <img [src]="value.img_url" [alt]="value.title" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
            <h2 class="text-white text-2xl md:text-4xl font-bold">{{value.title}}</h2>
        </div>
    </div>
</ng-template>
</p-carousel>
`,
})
export class MainCarouselComponent {

  mainImages = signal<Array<{img_url : string , path : string, title: string}>>([
    {
      img_url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&auto=format&fit=crop',
      path: '/fashion',
      title: 'Fashion Collection'
    },
    {
      img_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1920&auto=format&fit=crop',
      path: '/electronics',
      title: 'Electronics'
    },
    {
      img_url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1920&auto=format&fit=crop',
      path: '/home',
      title: 'Home & Living'
    },
    {
      img_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1920&auto=format&fit=crop',
      path: '/sports',
      title: 'Sports & Fitness'
    },
    {
      img_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop',
      path: '/gadgets',
      title: 'Latest Gadgets'
    },
    {
      img_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1920&auto=format&fit=crop',
      path: '/accessories',
      title: 'Premium Accessories'
    },
    {
      img_url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1920&auto=format&fit=crop',
      path: '/beauty',
      title: 'Beauty & Cosmetics'
    },

  ]);
}
