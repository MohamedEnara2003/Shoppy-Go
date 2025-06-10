import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AppStore } from '../../store/app.store';

export const isProductsErrorGuard: CanMatchFn = (route, segments) => {
  const appStore  = inject(AppStore); 
  const router = inject(Router);
  if(appStore.productsError()){
  router.navigateByUrl('/main/products-error')
  return false
  }
  return true;
};
