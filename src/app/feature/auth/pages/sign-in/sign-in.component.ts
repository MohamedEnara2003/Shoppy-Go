import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { AuthFieldComponent } from "../../components/auth-field/auth-field.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStore } from '../../../../store/app.store';

@Component({
  selector: 'app-sign-in',
  imports: [SharedModule, AuthFieldComponent],
  template: `
  <section class="size-full grid grid-cols-1 justify-self-center-safe" role="region" aria-label="Sign In Form">
    <header class="w-full flex flex-col gap-1 justify-center text-primary">
      <h1 class="title-h1 font-semibold text-2xl">Log in to Exclusive</h1>
      <p class="text-sm">Enter your details below</p>
    </header>

    <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" aria-label="Sign in form" class="w-full flex flex-col gap-5">
      <app-auth-field [form]="signInForm"/>
      
      <div class="w-full flex flex-wrap justify-between items-center">
        <button type="submit" [disabled]="signInForm.invalid" class="btn-secondary text-sm" aria-label="Submit sign in form">
          Log in
        </button>
        <a href="main/auth/sign-in" class="text-secondary capitalize text-sm hover:border-b" aria-label="Forgot password">
          Forgot Password?
        </a>
      </div>

      <a routerLink="/main/auth/sign-up" 
         class="text-sm w-full text-center hover:bg-gray-300 rounded-2xl p-1 duration-200"
         aria-label="Create new account">
        Don't have an account? <span class="border-b">Create One</span>
      </a>
    </form>
  </section>
  `,
  styles: ``
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  readonly appStore = inject(AppStore);
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const {email, password} = this.signInForm.getRawValue();
    if (this.signInForm.valid) {
      this.appStore.signIn(email, password);
    }
  }
}
