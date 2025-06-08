import { patchState, signalStoreFeature, withMethods, withState } from "@ngrx/signals";
import { Product } from "../../core/interfaces/products.type";
import { inject } from "@angular/core";
import { LocaleStorageService } from "../../core/services/locale-storage.service";

interface WishlistState {
    wishlist: Product[];
}

const initialWishlistState: WishlistState = {
    wishlist: [],
}

export const WishlistStore = signalStoreFeature(
    withState(initialWishlistState),

    withMethods((store) => {
        const wishlistKey = "Wishlist";
        const localStorage = inject(LocaleStorageService);
        return {
            getWishlist(): void {
                    const products = localStorage.getItem<Product[]>(wishlistKey);
                    if (products && Array.isArray(products)) {
                    patchState(store, { wishlist: products });
                    } else {
                    patchState(store, { wishlist: [] });
                    }
            },

            addToWishlist(product: Product): void {  
                    const currentWishlist = store.wishlist() || [];
                    if (!Array.isArray(currentWishlist)) {
                        patchState(store, { wishlist: [product] });
                        localStorage.setItem(wishlistKey, [product]);
                        return;
                    }

                    const isExisting = currentWishlist.some(item => item.id === product.id);
                    if (!isExisting) {
                        const newWishlist = [...currentWishlist, product];
                        localStorage.setItem(wishlistKey, newWishlist);
                        patchState(store, { wishlist: newWishlist });
                    }
                
            },

            removeFromWishlist(product: Product): void {
                    const currentWishlist = store.wishlist() || [];
                    if (!Array.isArray(currentWishlist)) {
                        patchState(store, { wishlist: [] });
                        localStorage.setItem(wishlistKey, []);
                        return;
                    }

                    const newWishlist = currentWishlist.filter(item => item.id !== product.id);
                    localStorage.setItem(wishlistKey, newWishlist);
                    patchState(store, { wishlist: newWishlist });
                
            },

            toggleWishlist(product: Product): void {
                    const currentWishlist = store.wishlist() || [];
                    if (!Array.isArray(currentWishlist)) {
                        this.addToWishlist(product);
                        return;
                    }

                    const isExisting = currentWishlist.some(item => item.id === product.id);
                    if (isExisting) {
                        this.removeFromWishlist(product);
                    } else {
                        this.addToWishlist(product);
                    }
            },

            isExistingWishlist(product: Product): boolean {
            const currentWishlist = store.wishlist() || [];
            return Array.isArray(currentWishlist) && currentWishlist.some(item => item.id === product.id);
            },
        
        isInWishlist(product : Product) : boolean {
        const wishlist = store.wishlist();
        if (!wishlist || !product) return false;
        return  wishlist.some(item => item.id === product.id);
        }
        
        }
    })
)