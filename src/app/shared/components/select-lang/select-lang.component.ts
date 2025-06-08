import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-select-lang',
  imports: [CommonModule],
  template: `
  <a href="#" class="flex gap-1 justify-center items-center"
  [ngClass]="langClass()">
  <span>English</span>
  <i class="pi pi-angle-down "></i>
  </a>
  `,
  styles: ``
})
export class SelectLangComponent {
  langClass = input<string>('text-white')
} 
