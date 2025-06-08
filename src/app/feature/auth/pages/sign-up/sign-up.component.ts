import { Component, inject, OnInit } from '@angular/core';
import { SignWithGoogleComponent } from "../../components/sign-with-google/sign-with-google.component";
import { SharedModule } from '../../../../shared/modules/shared.module';
import { AuthFieldComponent } from "../../components/auth-field/auth-field.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStore } from '../../../../store/app.store';

@Component({
  selector: 'app-sign-up',
  imports: [SignWithGoogleComponent, SharedModule, AuthFieldComponent],
  template: `
  <section class="size-full grid grid-cols-1 justify-self-center-safe" role="region" aria-label="Sign Up Form">
    <header class="w-full flex flex-col gap-1 justify-center text-primary">
      <h1 class="title-h1 font-semibold text-2xl">Create an account</h1>
      <p class="text-sm">Enter your details below</p>
    </header>

    <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" aria-label="Sign up form" class="w-full flex flex-col gap-5">
      <div class="w-full grid grid-cols-1 gap-5">
        <div>
          <p-floatlabel variant="on">
            <input id="Name" pInputText class="w-full" formControlName="name" autocomplete="name" 
              [ngClass]="{
                'ng-dirty ng-invalid': signUpForm.get('name')?.invalid && signUpForm.get('name')?.touched
              }"
              aria-required="true"
              aria-invalid="signUpForm.get('name')?.invalid"
            />
            <label for="Name">Name</label>
          </p-floatlabel>
          @if (signUpForm.get('name')?.invalid && signUpForm.get('name')?.touched) {
            <small class="text-red-500 text-xs mt-1" role="alert">
              @if (signUpForm.get('name')?.errors?.['required']) {
                Name is required
              } @else if (signUpForm.get('name')?.errors?.['minlength']) {
                Name must be at least 2 characters
              }
            </small>
          }
        </div>

        <app-auth-field [form]="signUpForm" />
      </div>

      <div class="w-full flex flex-col justify-center gap-4">
        <button type="submit" [disabled]="signUpForm.invalid" class="w-full btn-secondary text-sm p-3" aria-label="Create account">
          Create Account
        </button>
        <app-sign-with-google />
        <a routerLink="/main/auth/sign-in"
           class="text-sm w-full text-center hover:bg-gray-300 rounded-2xl p-1 duration-200"
           aria-label="Sign in to existing account">
          Already have account? <span class="border-b">Log in</span>
        </a>
      </div>
    </form>
  </section>
  `
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  readonly appStore = inject(AppStore);
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const {name, email, password} = this.signUpForm.getRawValue();
    if (this.signUpForm.valid) {
      this.appStore.signUp(name, email, password);
    }
  }
}
