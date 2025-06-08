import { signalStore } from "@ngrx/signals";
import { ProductsStore } from "./products/products.signal";
import { DashboardStore } from "./dashboard/dashboard.signal";
import { AuthStore } from "./auth/auth.signal";
import { UsersStore } from "./users/users.signal";
import { CartStore } from "./cart/cart.signal";
import { WishlistStore } from "./wishlist/wishlist.signal";



export const AppStore = signalStore(
    {providedIn: 'root'},
    ProductsStore,
    DashboardStore,
    AuthStore,
    UsersStore,
    CartStore,
    WishlistStore,
    
)