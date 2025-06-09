import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule , RouterModule],
  template: `
<p-carousel [value]="mainImages()" [numVisible]="1" [numScroll]="1" 
[circular]="true" [showNavigators]="false" [autoplayInterval]="3000"> 
<ng-template let-value #item>
    <div class="w-full h-[30vh] sm:h-[60vh] lg:h-[70vh] bg-black flex justify-between items-center relative"
    [routerLink]="value.path" [queryParams]="value.categoryQuery">
        <img [src]="value.img_url" [alt]="value.title" class="w-full h-full object-cover">
    </div>
</ng-template>
</p-carousel>
`,
})
export class MainCarouselComponent {

  mainImages = signal<Array<{img_url : string , path : string | null , categoryQuery? : {category : string}}>>([
    {
      img_url: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Fashion-Banner.webp',
      path: '/main/shop',
      categoryQuery : {category : 'Men Clothing'}
    },
    {
      img_url: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//18051739.webp',
      path: '/main/shop',
      categoryQuery : {category : 'Furniture'}
    },
    {
      img_url: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//electronices.webp',
      path: '/main/shop',
      categoryQuery : {category : 'Electronics'}
    },
    {
      img_url: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Furniture-Banner.webp',
      path: '/main/shop',
      categoryQuery : {category : 'Furniture'}
    },
    {
      img_url: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Men-Fashion.webp',
      path: '/main/shop',
      categoryQuery : {category : 'Men Clothing'}
    },
    {
      img_url: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Gaming-Banner.webp',
      path: '/main/shop',
      categoryQuery : {category : 'Toys & Games'}
    },
  
  ]);
}
