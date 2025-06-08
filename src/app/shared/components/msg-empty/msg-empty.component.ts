import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-msg-empty',
  imports: [RouterModule],
  template: `
  <div class="w-full flex flex-col justify-center items-center gap-5 h-80">
    <h1 class="text-2xl md:text-3xl font-semibold text-primary">
    {{msgEmpty()}}
    </h1>
    <button routerLink="/" type="button" class="btn-secondary">
    <i class="pi pi-home"></i>
    Back To Home
    </button>
  </div>  
  `,
  styles: ``
})
export class MsgEmptyComponent {
  msgEmpty = input.required<string>();
}
