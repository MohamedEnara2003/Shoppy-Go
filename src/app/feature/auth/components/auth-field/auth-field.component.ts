import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-field',
  imports: [SharedModule],
  template: `
  <div [formGroup]="form()" class="w-full grid grid-cols-1 gap-5" role="group" aria-label="Authentication fields">
    <div>
      <p-floatlabel variant="on">
        <input id="Email" pInputText class="w-full" formControlName="email" autocomplete="email" 
          [ngClass]="{
            'ng-dirty ng-invalid': form().controls['email'].invalid && form().controls['email'].touched
          }"
          aria-required="true"
          aria-invalid="form().controls['email'].invalid"
        />
        <label for="Email">Email</label>
      </p-floatlabel>
      @if (form().controls['email'].invalid && form().controls['email'].touched) {
        <small class="text-red-500 text-xs mt-1" role="alert">
          @if (form().controls['email'].errors?.['required']) {
            Email is required
          } @else if (form().controls['email'].errors?.['email']) {
            Please enter a valid email
          }
        </small>
      }
    </div>

    <div>
      <p-floatlabel variant="on">
        <p-password inputId="Password" [toggleMask]="true" inputStyleClass="w-full" autocomplete="current-password" 
          [style]="{ width: '100%' }" formControlName="password"
          [ngClass]="{
            'ng-dirty ng-invalid': form().controls['password'].invalid && form().controls['password'].touched
          }"
          aria-required="true"
          aria-invalid="form().controls['password'].invalid"
        />
        <label for="Password">Password</label>
      </p-floatlabel>
      @if (form().controls['password'].invalid && form().controls['password'].touched) {
        <small class="text-red-500 text-xs mt-1" role="alert">
          @if (form().controls['password'].errors?.['required']) {
            Password is required
          } @else if (form().controls['password'].errors?.['minlength']) {
            Password must be at least 6 characters
          }
        </small>
      }
    </div>
  </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthFieldComponent {
  form = input.required<FormGroup>();
}
