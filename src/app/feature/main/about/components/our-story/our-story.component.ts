import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-our-story',
  imports: [DividerModule],
  template: `
    <article class="w-full h-full flex flex-col gap-4 p-1 sm:p-6 md:p-12">
      <header>
        <h1 class="title-h1 text-2xl sm:text-3xl md:text-4xl font-[500]">Our Story</h1>
      </header>

      <div class="capitalize text-primary">
        <p>
          Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh.
          Supported by wide range of tailored marketing, data and service solutions,
          Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region. 
        </p>
        <p-divider role="separator" aria-orientation="horizontal" />
        <p>
          Exclusive has more than 1 Million products to offer,
          growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer.
        </p>
      </div>
    </article>
  `,
  styles: ``
})
export class OurStoryComponent {}
