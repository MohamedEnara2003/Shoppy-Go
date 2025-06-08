import { Component, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { HighlightsDetailsComponent } from "../../../home/components/highlights-details/highlights-details.component";

@Component({
  selector: 'app-about-team',
  imports: [CarouselModule, CommonModule, HighlightsDetailsComponent],
  template: `
    <section class="w-full py-10 flex flex-col justify-center  text-primary">
      <app-highlights-details tagName="Our Team"/>
      
      <p-carousel 
        [value]="aboutTeam()" 
        [responsiveOptions]="responsiveOptions"
        [showIndicators]="true"
        [showNavigators]="true"
        [style]="{'--p-carousel-indicators-bg': 'var(--color-primary)',
        '--p-carousel-indicators-active-bg': 'var(--color-secondary)'}"
        class="w-full md:px-10 ">
        <ng-template let-member pTemplate="item">
          <div class="p-4">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="relative w-[250px] h-[320px]">
                <img [src]="member.img" [alt]="member.name" class="size-full object-cover"
                loading="lazy">
              </div>

              <div class="p-4 grid grid-cols-1 gap-1">
                <h3 class="text-base font-semibold ">{{member.name}}</h3>
                <p class="text-xs">{{member.job}}</p>
                @if (member.socialMedia) {
                  <div class="flex  gap-4 mt-1">
                    @for (social of member.socialMedia; track social) {
                      <a [href]="social.path" target="_blank" class="text-primary hover:text-secondary 
                      duration-200 transition-colors">
                        <i [class]="social.icon"></i>
                      </a>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </ng-template>
      </p-carousel>
    </section>
  `,

})
export class AboutTeamComponent {
  responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '1060px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '470px',
        numVisible: 1,
        numScroll: 1,
    },
];

  aboutTeam = signal<Array<{
    img: string,
    name: string,
    job: string,
    socialMedia?: Array<{icon: string, path?: string}>
  }>>([
    {
      img: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Frame874.webp',
      name: 'Tom Cruise',
      job: 'Founder & Chairman',
      socialMedia: [
        { icon: 'pi pi-facebook', path: '#' },
        { icon: 'pi pi-twitter', path: '#' },
        { icon: 'pi pi-linkedin', path: '#' }
      ]
    },
    {
      img: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//image51.webp',
      name: 'Emma Watson',
      job: 'Managing Director',
      socialMedia: [
        { icon: 'pi pi-facebook', path: '#' },
        { icon: 'pi pi-twitter', path: '#' },
        { icon: 'pi pi-linkedin', path: '#' }
      ]
    },
    {
      img: 'https://dnfkmgvtpnayboephfas.supabase.co/storage/v1/object/public/images//Frame876.webp',
      name: 'Will Smith',
      job: 'Product Designer',
      socialMedia: [
        { icon: 'pi pi-facebook', path: '#' },
        { icon: 'pi pi-twitter', path: '#' },
        { icon: 'pi pi-linkedin', path: '#' }
      ]
    }
  ]);
}
