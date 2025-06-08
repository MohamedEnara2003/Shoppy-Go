import { Component, input } from '@angular/core';
import { ServiceCard } from '../../interfaces/shared.types';

@Component({
  selector: 'app-service-card',
  imports: [],
  template: `
    <article class="w-50 h-45 flex flex-col justify-center items-center gap-5 rounded p-1
      hover:bg-secondary hover:text-white duration-300 transition-all"
      role="article"
      [attr.aria-label]="service().title"
    >
      <div class="size-[2.5rem] outline-8 outline-neutral-400 text-white bg-primary rounded-full
        flex justify-center items-center"
        role="img"
        [attr.aria-label]="service().title + ' icon'"
      >
        <i [class]="service().icon" [style]="{fontSize : '1.5rem'}" aria-hidden="true"></i>
      </div>
      <div class="text-center">
        <h2 class="uppercase text-sm font-bold">{{service().title}}</h2>
        <p class="text-xs">{{service().info}}</p>
      </div>
    </article>
  `,
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceCard>();
}
