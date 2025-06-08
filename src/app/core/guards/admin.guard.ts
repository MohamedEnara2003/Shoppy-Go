import { CanMatchFn, Router } from '@angular/router';
import { authClient } from '../../../environment/environment';
import { inject } from '@angular/core';

async function isAdmin(router: Router): Promise<boolean> {
  const { data, error } = await authClient.getSession();
  const userId =   data.session?.user.id;
  const adminId = "da257d11-e8e3-4869-a750-63e6a130fa45" ;
  if (error || userId !== adminId) {
  router.navigate(['/main/auth/sign-up']);
  return false
  }
  return true
  
}

export const adminGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  return isAdmin(router);
};
