import { Routes } from '@angular/router';


export const routes: Routes = [
    {path : 'main'  ,
    loadComponent : () =>  import('./feature/main/main.component').then((c) => c.MainComponent),
    loadChildren : () => import('./feature/main/main.routes').then((r) => r.mainRoutes),
    },
    {path : 'dashboard'  ,
    loadComponent : () => import('./dashboard/ui/dashboard.component').then((c) => c.DashboardComponent),
    loadChildren : () =>  import('./dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
    },
    {
    path: 'call-back', 
    loadComponent: () => import('./feature/auth/components/auth-call-back/auth-call-back.component')
    .then(c => c.AuthCallBackComponent), outlet : 'auth' ,
    },

    {path : '' ,  redirectTo :'main' , pathMatch :'full'}
];
