import { Routes } from '@angular/router';
import { checkoutGuard } from '../../core/guards/checkout.guard';
import { isProductsErrorGuard } from '../../core/guards/is-products-error.guard';

export const mainRoutes: Routes = [
    {path : 'auth', 
        loadComponent : () => import('../auth/ui/auth.component').then((c) => c.AuthComponent),
        loadChildren : () => import('../auth/auth.routes').then((r) => r.authRoutes)
    },

    {path : 'home' , canMatch : [isProductsErrorGuard] ,
    loadComponent : () => import('./home/ui/home.component').then((c) => c.HomeComponent)},
    {path : 'about' , loadComponent : () => import('./about/ui/about.component').then((c) => c.AboutComponent)},
    {path : 'contact' , loadComponent : () => import('./contact/ui/contact.component').then((c) => c.ContactComponent)},
    {path : 'cart' , loadComponent : () => import('./cart/ui/cart.component').then((c) => c.CartComponent)},
    {path : 'wishlist' , loadComponent : () => 
    import('./wishlist/ui/wishlist.component').then((c) => c.WishlistComponent)},

    {path : 'checkout',loadComponent:()=> import('./checkout/ui/checkout.component').then((c) => c.CheckoutComponent),
    canActivate : [checkoutGuard],
    },
    {path : 'orders' , loadComponent : () => import('./orders/ui/orders.component').then((c) => c.OrdersComponent)},
    
    {path : 'shop' , canMatch : [isProductsErrorGuard] ,
    loadComponent : () => import('./shop/ui/shop.component')
    .then((c) => c.ShopComponent)},

    {path : 'products-error' , loadComponent : () => import('./products/pages/products-error/products-error.component')
    .then((c) => c.ProductsErrorComponent)},

    {path : 'product/:id' ,   canMatch : [isProductsErrorGuard] ,
        loadComponent : () => import('./products/pages/product-details/product-details.component')
    .then((c) => c.ProductDetailsComponent)
    },

    {path : 'not-found' , loadComponent : () => import('./not-found/not-found.component')
    .then((c) => c.NotFoundComponent)
    },
    {path : '' , redirectTo :'/main/home' , pathMatch :'full'},
    {path : '**' , redirectTo :'/main/not-found' , pathMatch :'full'}
];
