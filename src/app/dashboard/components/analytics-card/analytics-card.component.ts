import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article 
      class="w-full h-32 bg-gray-300 rounded-xl shadow-sm p-4 hover:shadow-md shadow-primary 
      transition-all duration-200 border border-gray-300"
      role="region"
      [attr.aria-label]="title()"
    >
      <div class="w-full h-full flex items-start justify-between">
        <div class="flex-1">
          <h3 class="text-gray-700 text-sm font-medium capitalize" id="card-title-{{title()}}">{{ title() }}</h3>
          <div class="flex items-baseline gap-2 mt-2" 
          [attr.aria-labelledby]="'card-title-' + title()">
            <p class="text-xl font-semibold text-primary">{{ count() }}</p>
            <span class="text-sm text-gray-500">{{ content() }}</span>
          </div>
        </div>
        <div 
          class="size-10 bg-secondary rounded-full flex justify-center items-center shrink-0"
          aria-hidden="true"
        >
          <i [class]="icon() ? icon() : 'pi-chart-line '" class="pi text-white text-lg"></i>
        </div>
      </div>
    </article>
  `
})
export class AnalyticsCardComponent {
  title = input<string>('');
  count = input<string | number>('');
  content = input<string>('');
  icon = input<string>();
}
