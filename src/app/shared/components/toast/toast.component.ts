import { Component } from '@angular/core';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-toast',
  imports: [Toast],
  template: `
  <div class="card flex justify-center gap-2" aria-label="Toast" role="alert">
    <p-toast [style]="{width: '90vw', maxWidth: '350px'}" />
  </div>
  `,

})
export class ToastComponent {}
