import { Component } from '@angular/core';
import { HighlightsDetailsComponent } from "../highlights-details/highlights-details.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-arrival',
  imports: [HighlightsDetailsComponent , RouterModule],
  template: `
  <section class="w-full grid grid-cols-1 gap-5" aria-label="New Arrival Products">
    <app-highlights-details tagName="Featured" title="New Arrival"/>
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 my-2">
      <!-- PS5 Banner -->
      <article role="banner" class="relative size-full bg-primary flex justify-center items-end rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-[3/2] min-h-[400px]">
        @defer (on viewport) {
        <img 
          src="https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//ps5-slim.png" 
          alt="PlayStation 5 Slim Console - Latest Gaming Technology" 
          class="h-[90%] object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width="600"
          height="400"
          fetchpriority="high"
        >
        <div class="absolute left-0 bottom-0 flex flex-col justify-end items-start z-10 text-white p-4 gap-2 bg-gradient-to-t from-black/70 to-transparent w-full">
          <h2 class="title-h1 text-white font-semibold text-sm sm:text-lg">PlayStation 5</h2>
          <p class="text-xs sm:text-sm">Black and White version of the PS5 coming out on sale.</p>
        <button type="button" class="border-b border-b-white text-xs sm:text-sm 
          transition-colors duration-300 hover:text-secondary cursor-pointer" aria-label="Shop PlayStation 5">
          Shop Now
        </button>
        </div>
      }@placeholder {
      <div class="size-full bg-gray-300 animate-pulse rounded-lg"></div>
      }
      </article>

      <div class="size-full grid grid-cols-4 gap-5">
        <!-- Women's Collection -->
        <article class="col-span-4 relative w-full bg-[#0D0D0D] flex justify-center rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-[2/1] min-h-[300px]">
        @defer (on viewport) {
        <div class="absolute inset-0 flex flex-col justify-end items-start z-10 text-white p-4 gap-2 bg-gradient-to-t from-black/70 to-transparent">
            <h2 class="title-h1 text-white font-semibold text-sm sm:text-lg">Women's Collections</h2>
            <p class="text-xs sm:text-sm">Featured woman collections that give you another vibe.</p>
            <button type="button"  routerLink="/main/shop" [queryParams]="{category : 'Women Clothing'}"
            class="border-b border-b-white text-xs sm:text-sm hover:text-primary-300 transition-colors duration-300
            hover:text-secondary cursor-pointer" 
            aria-label="Shop Women's Collection">
            Shop Now
          </button>
          </div>
          <div class="size-full">
            <img 
              src="https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//attractive-woman-wearing.webp" 
              alt="Women's Fashion Collection - Latest Trends" 
              class="size-full object-contain transform hover:scale-110 transition-transform duration-300"
              loading="lazy"
              width="800"
              height="400"
            >
          </div>
        }@placeholder {
        <div class="size-full bg-gray-300 animate-pulse rounded-lg"></div>
        }
        </article>

        <!-- Speakers -->
        <article class="relative col-span-2 w-full bg-[#0D0D0D]/95 flex justify-center items-center rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-square min-h-[200px]">
        @defer (on viewport) {
          <img 
            src="https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//69-694768_amazon.png" 
            alt="Amazon Premium Wireless Speakers" 
            class="size-[90%] object-contain transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="300"
            height="300"
          >
          <div class="absolute left-2 bottom-0 flex flex-col justify-end items-start z-10 text-white p-4 gap-2 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 class="title-h1 text-white font-semibold text-sm sm:text-lg">Speakers</h2>
            <p class="text-xs sm:text-sm">Amazon wireless speakers</p>
          <button type="button" class="border-b border-b-white text-xs sm:text-sm hover:text-secondary cursor-pointer
            transition-colors duration-300" aria-label="Shop Amazon Speakers">
            Shop Now
          </button>
          </div>
        }@placeholder {
        <div class="size-full bg-gray-300 animate-pulse rounded-lg"></div>
        }
        </article>

        <!-- Perfume -->
        <article class="relative col-span-2 w-full bg-[#0D0D0D]/95 flex justify-center items-center rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-square min-h-[200px]">
        @defer (on viewport) {
          <img 
            src="https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Frame706.png" 
            alt="GUCCI INTENSE OUD EDP - Luxury Perfume" 
            class="size-[90%] object-contain transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="300"
            height="300"
          >
          <div class="absolute left-2 bottom-0 flex flex-col justify-end items-start z-10 text-white p-4 gap-2 bg-gradient-to-t from-black/70 to-transparent w-full">
            <h2 class="title-h1 text-white font-semibold text-sm sm:text-lg">Perfume</h2>
            <p class="text-xs sm:text-sm">GUCCI INTENSE OUD EDP</p>
            <button type="button" class="border-b border-b-white text-xs sm:text-sm hover:text-secondary cursor-pointer
            transition-colors duration-300" aria-label="Shop GUCCI Perfume">Shop Now</button>
          </div>
        }@placeholder {
        <div class="size-full bg-gray-300 animate-pulse rounded-lg"></div>
        }
        </article>
      </div>
    </div>
  </section>
  `,
  standalone: true
})
export class NewArrivalComponent {
}
