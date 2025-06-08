import { Component, inject } from '@angular/core';
import { AppStore } from '../../../../store/app.store';
import { RouterModule } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-auth-call-back',
  imports: [RouterModule],
  template: `
  <section class="w-full h-screen fixed left-0 top-0 flex justify-center items-center">
  <article class="relative w-full  lg:w-1/2 h-[70vh] bg-gray-50 rounded-box shadow shadow-black flex flex-col z-20
  justify-around items-center p-2 gap-4">
  <button [routerLink]="['/' , {outlets : { primary : 'main/home' , auth : null}}]" type="button">
  <i class="pi pi-times absolute left-4 top-4 cursor-pointer"></i>
  </button>

  <i class="pi pi-check-circle text-tertiary" [style]="{fontSize : '8rem'}"></i>

  <div class="flex flex-col justify-center items-center gap-1">
  <h1 class="title-h1">Your account has been created <span class="text-tertiary">successfully</span>.</h1>
  <h2 class="text-lg font-semibold text-primary ">You can now log in.</h2>
  </div>

  <div class="w-full flex justify-center items-center gap-5">
  <button [routerLink]="['/' , {outlets : { primary : 'main/home' , auth : null}}]"
  type="button" class="w-50 text-sm btn-secondary">
  <i class="pi pi-home"></i>
  back to Home
  </button>
  <button [routerLink]="['/' , {outlets : { primary : 'main/home' , auth : null}}]"
  type="button" class="w-50 text-sm btn-secondary bg-transparent text-secondary">
  <i class="pi pi-shopping-cart "></i>
    continue shopping 
  </button>
  </div>

  </article>
  <div [routerLink]="['/' , {outlets : { primary : 'main/home' , auth : null}}]" 
  class="size-full fixed bg-primary opacity-50 left-0 top-0"></div>
  </section>
  `
})
export class AuthCallBackComponent{
  readonly appStore = inject(AppStore);

  constructor(){
  this.initAuthCallBack()
  }
  
  private initAuthCallBack() : void {
  this.appStore.initGetUserData().pipe(
  tap((user) => this.appStore.initAddUser(user)),
  catchError(() => EMPTY),
  takeUntilDestroyed()
  ).subscribe();
  }
}
