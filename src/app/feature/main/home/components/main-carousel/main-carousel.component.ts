import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule, RouterModule, CommonModule],
  template: `
<p-carousel [value]="mainImages()" [numVisible]="1" [numScroll]="1" 
[circular]="true" [showNavigators]="false" [autoplayInterval]="3000"
aria-label="Featured products carousel"> 
<ng-template let-value pTemplate="item">
    <picture class="w-full aspect-[16/8] bg-gray-100 flex justify-between items-center relative"
    [routerLink]="value.path" 
    [queryParams]="value.categoryQuery"
    role="link"
    [attr.aria-label]="'View ' + (value.categoryQuery?.category || 'products')">
    <source [srcset]="value.url5" type="image/webp" media="(max-width: 480px)">
    <source [srcset]="value.url4" type="image/webp" media="(max-width: 768px)">
    <source [srcset]="value.url3" type="image/webp" media="(max-width: 768px)">
    <source [srcset]="value.url2" type="image/webp" media="(max-width: 1440px)">

        <img [src]="value.url" 
            [alt]="value.categoryQuery?.category + ' banner image'" 
            (error)="handleFailedImages(value.img_url)"
            class="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            width="600" 
            height="400"
            fetchpriority="high" />
    </picture>
</ng-template>
</p-carousel>
`,
})
export class MainCarouselComponent {

  mainImages = signal([
    {
    url:  'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Fashion-Banner.webp',
    url2: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Fashion-Banner-1.webp',
    url3: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Fashion-Banner-2.webp',
    url4: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Fashion-Banner-3.webp',
    url5: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Fashion-Banner-4.webp',
    path: '/main/shop',
    categoryQuery : {category : 'Men Clothing'}
    },
    {
    url:  'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//18051739.webp',
    url2: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//18051739%20(1).webp',
    url3: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//18051739%20(2).webp',
    url4: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//18051739%20(3).webp',
    url5: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//18051739%20(4).webp',
    path: '/main/shop',
    categoryQuery : {category : 'Furniture'}
    },
    {
    url:  'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Furniture-Banner.webp',
    url2: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Furniture-Banner(1).webp',
    url3: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Furniture-Banner(2).webp',
    url4: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Furniture-Banner(3).webp',
    url5: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/imagesintro//Furniture-Banner(4).webp',
    path: '/main/shop',
    categoryQuery : {category : 'Electronics'}
    }
  ]);

  handleFailedImages(imageUrl: string): void {
    this.mainImages.update(images => images.filter(img => img.url !== imageUrl));
  }
}


