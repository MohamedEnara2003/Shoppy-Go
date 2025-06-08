import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../../store/app.store';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const appStore = inject(AppStore);
  const router = inject(Router);
  if(appStore.carts().length > 0){
  return true;
  }
  router.navigate(['/main/cart'])
  return false
};
