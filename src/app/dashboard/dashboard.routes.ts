import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {path : 'products' , loadComponent : () => import('./pages/products/ui/dashboard-products.component')
    .then((c) => c.DashboardProductsComponent)
    },
    {path : 'products/choose-category' 
    , loadComponent : () => import('./pages/products/components/choose-category/choose-category.component')
    .then((c) => c.ChooseCategoryComponent)
    },
    {path : 'users' , loadComponent : () => import('./pages/users/ui/users.component')
    .then((c) => c.UsersComponent)
    },
    {path : 'orders' , loadComponent : () => import('./pages/users-orders/ui/orders.component')
    .then((c) => c.OrdersComponent)
    },
];
