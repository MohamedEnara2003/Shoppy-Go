import { Component } from '@angular/core';

@Component({
  selector: 'app-about-banner',
  imports: [],
  template: `
    <div 
      class="relative w-full aspect-[3/2] shadow shadow-primary"
      role="img"
      aria-label="About page banner image"
    >
      <img 
        [src]="imgBanner" 
        alt="Company overview banner image showing our office and team" 
        class="size-full object-cover"  
        loading="lazy"
        width="1200"
        height="400"
        fetchpriority="high"
      >
    </div>
  `,
})
export class AboutBannerComponent {
  imgBanner: string = 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//about.webp';
}
