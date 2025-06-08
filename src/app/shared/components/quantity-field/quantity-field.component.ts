import { Component, input, output, model } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-quantity-field',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="flex items-center space-x-1" role="spinbutton" aria-label="Quantity">
      <p-button 
        (click)="decrement()" 
        icon="pi pi-minus" 
        size="small" 
        [disabled]="value() < 2"
        [style]="{backgroundColor : '#d1d5dc ' , color : 'black', border : '1px solid #99a1af '}"
        aria-label="Decrease quantity"
      />
      
      <input 
        type="number" 
        [ngModel]="value()"
        (ngModelChange)="onValueChange($event)"
        [min]="min"
        [max]="max()"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
        class="w-16 h-8 text-center border border-gray-300 rounded focus:outline-none bg-white font-semibold"
        aria-label="Quantity input"
      />
      
      <p-button 
        (click)="increment()" 
        icon="pi pi-plus" 
        size="small" 
        [disabled]="value() === max()"
        [style]="{backgroundColor : 'var(--color-secondary)', border : '1px solid #99a1af'}"
        aria-label="Increase quantity"
      />
    </div>
  `
})
export class QuantityFieldComponent {
  value = model<number>(1);
  min: number = 1;
  max = input<number>(99);
  valueChange = output<number>();

  increment() {
    this.updateValue(1);
  }

  decrement() {
    this.updateValue(-1);
  }

  private updateValue(value: number): void {
    if (this.value() < this.max() || this.value() > this.min) {
      this.value.set(this.value() + value);
      this.valueChange.emit(this.value());
    }
  }

  onValueChange(newValue: number) {
    if (newValue < this.min) {
      this.value.set(this.min);
    } else if (newValue > this.max()) {
      this.value.set(this.max());
    } else {
      this.value.set(newValue);
    }
    this.valueChange.emit(this.value());
  }
}
