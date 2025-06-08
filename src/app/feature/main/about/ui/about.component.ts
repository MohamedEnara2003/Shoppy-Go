import { Component, signal } from '@angular/core';
import { NavListItemComponent } from "../../../../shared/components/navigations/nav-list-item/nav-list-item.component";
import { MenuItem } from 'primeng/api';
import { AboutBannerComponent } from "../components/about-banner/about-banner.component";
import { OurStoryComponent } from "../components/our-story/our-story.component";
import { ServiceHighlightsComponent } from "../../home/components/service-highlights/service-highlights.component";
import { AboutTeamComponent } from "../components/about-team/about-team.component";
import { InfoAboutSalesComponent } from "../components/info-about-sales/info-about-sales.component";

@Component({
  selector: 'app-about',
  imports: [
    NavListItemComponent,
    AboutBannerComponent,
    OurStoryComponent,
    ServiceHighlightsComponent,
    AboutTeamComponent,
    InfoAboutSalesComponent
  ],
  template: `
    <main class="w-full grid grid-cols-1 gap-5" role="main">
      <nav aria-label="Breadcrumb navigation">
        <app-nav-list-item [items]="navLinks()"/>
      </nav>
      
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-our-story/>
        <app-about-banner/>
      </div>
      
      <section aria-labelledby="sales-info-heading">
        <h2 id="sales-info-heading" class="sr-only">Sales Information</h2>
        <app-info-about-sales/>
      </section>
      
      <section aria-labelledby="team-heading">
        <h2 id="team-heading" class="sr-only">Our Team</h2>
        <app-about-team />
      </section>
      
      <section aria-labelledby="service-highlights-heading">
        <h2 id="service-highlights-heading" class="sr-only">Service Highlights</h2>
        <app-service-highlights />
      </section>
    </main>
  `,

})
export class AboutComponent {
  navLinks = signal<MenuItem[]>([
    {label: 'Home', routerLink: '/main/home'},
    {label: 'About'},
  ])
}
