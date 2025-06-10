import { computed, inject } from "@angular/core";
import { Product, ProductInventoryStatus } from "../../core/interfaces/products.type";
import { patchState,  signalStoreFeature , withComputed, withMethods, withState } from "@ngrx/signals";
import { ProductsService } from "../../feature/main/products/service/products.service";
import { catchError, of, switchMap, take, tap } from "rxjs";
import { ImageConverterService } from "../../core/services/ImageConverter.service";
import {  MegaMenuItem } from "primeng/api";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PaginatorService } from "../../core/services/paginator.service";



interface ProductState {
    products : Product[];
    product : Product | undefined;
    editedProduct : Product | undefined;
    isProductsLoading : boolean,
    productsError : string ,
    uploadedFiles : Array<{previewUrl : string , file_name : string ,file_url: string}>,
    category : string ,
    isUpsertProduct : boolean ,
    queryCategory : string ,
    queryType : string ,
    queryBrand : string,
    minPrice : number,
    maxPrice : number,
}

const initialProductState : ProductState = {
    products  : [] ,
    product : undefined ,
    editedProduct : undefined ,
    isProductsLoading :false , 
    productsError : '' ,
    uploadedFiles : [] ,
    category : '',
    isUpsertProduct : false,
    queryCategory : '' ,
    queryType : '' ,
    queryBrand : '' ,
    minPrice : 0,
    maxPrice : 0,
}

export const ProductsStore =  signalStoreFeature(
    withState(initialProductState),
    withComputed((store) => {
    const paginatorService = inject(PaginatorService);
    return {
    productsCount : computed<number>(() => store.products().length),
    productsTotalPrices : computed<number>(() => store.products().reduce((p , v) => p += v.final_price , 0)),
    
    categories : computed<string[]>(() => {
        const products = store.products();
        if (!products.length) return [];
        const categories = new Set<string>();
        for (const product of products) {
            categories.add(product.category);
        }
        return Array.from(categories);
    }),
    
    types : computed<string[]>(() => {
        const products = store.products();
        if (!products.length) return [];
        const types = new Set<string>();
        for (const product of products) {
            types.add(product.type);
        }
        return Array.from(types);
    }),
    
    brands : computed<string[]>(() => {
        const products = store.products();
        if (!products.length) return [];
        const brands = new Set<string>();
        for (const product of products) {
            brands.add(product.brand);
        }
        return Array.from(brands);
    }),

    categoryMegaMenuItem : computed<MegaMenuItem[]>(() => {
        const products = store.products();
        if (!products.length) return [];
        
        const categoryMap = new Map<string, Set<string>>();
        const productMap = new Map<string, Product[]>();
        
        // Build efficient data structures
        for (const product of products) {
            if (!categoryMap.has(product.category)) {
                categoryMap.set(product.category, new Set());
                productMap.set(product.category, []);
            }
            categoryMap.get(product.category)?.add(product.type);
            productMap.get(product.category)?.push(product);
        }
        
        return Array.from(categoryMap.entries()).map(([category, types]) => {
            const categoryProducts = productMap.get(category) || [];
            const typeGroups = [];
            const typesArray = Array.from(types);
            
            for (let i = 0; i < typesArray.length; i += 2) {
                typeGroups.push(typesArray.slice(i, i + 2));
            }
            
            return {
                label: category,
                items: typeGroups.map(typeGroup => [
                    ...typeGroup.map(type => ({
                        label: type,
                        items: categoryProducts
                            .filter(product => product.type === type)
                            .map(product => ({
                                label: product.title,
                                routerLink: ['/main/product', product.id]
                            }))
                    }))
                ])
            };
        });
    }),
    
    filteringProducts : computed<Product[]>(() => {
        const products = store.products();
        if (!products.length) return [];
        
        const category = store.queryCategory();
        const type = store.queryType();
        const brand = store.queryBrand();
        const minPrice = store.minPrice();
        const maxPrice = store.maxPrice();
        const start = paginatorService.first();
        const rows = paginatorService.rows() + start;

        // Early return if no filters are active
        if (!category && !type && !brand && minPrice === 0 && maxPrice === 0) {
            return products.slice(start, rows);
        }

        return products.filter(product => 
            (!category || product.category === category) &&
            (!type || product.type === type) &&
            (!brand || product.brand === brand) &&
            (product.final_price >= minPrice && product.final_price <= maxPrice)
        ).slice(start, rows);
    })
    }
    }),

    withMethods((store) => {

    const productsService = inject(ProductsService);
    const imageConverterService = inject(ImageConverterService);

    return {

    // Methods Filtring in Shop Page
    getMinAndMaxPrice(products : Product[]) : void {
        const prices = products.map((product) => product.price);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        patchState(store , {maxPrice , minPrice })
    },
    
    getFilteringQueries(queryCategory  : string , queryType : string , queryBrand : string ) : void{
    patchState(store , {queryCategory , queryType , queryBrand});
    },

    onChagePriceRange(values : number[]) : void {
    const [minPrice, maxPrice] = values;
    patchState(store, {minPrice, maxPrice});
    },  
    
    //

    getProducts() : void {
    if(store.products().length < 1){
    patchState(store , {isProductsLoading : true})
    productsService.getProducts().pipe(
    take(1),
    tap((products) => {
    patchState(store , ({isProductsLoading : false , products}));
    this.getMinAndMaxPrice(products);
    }),
    catchError((err : Error) =>  {
    patchState(store ,({ isProductsLoading : false , productsError : err.message}))
    return of([])
    }), takeUntilDestroyed()
    ).subscribe();
    }
    },
    
    getProductById(id : string) : void {
    if(store.product()?.id !== id){ 
    productsService.getProductById(id).pipe(
    take(1),
    tap((product) => patchState(store , ({product}))),
    catchError((err : Error) =>  of(null)), 
    ).subscribe();
    }
    },
    
    
    createProduct(newProduct: Product): void {
        productsService.createProduct(newProduct).pipe(
        tap((product) => {
        const products = [...store.products(), product];
        patchState(store, {products});
        }),
        ).subscribe();
    },
    updateProduct(updatedProduct : Product) : void {
    const productId = store.editedProduct()?.id;
    if(productId) 
    productsService.updateProduct(updatedProduct , productId ).pipe(
    tap((updatedProduct) =>  {
    const products = 
    store.products().map((product) => product.id === updatedProduct.id ? {...product, ...updatedProduct} : product);
    patchState(store , ({products})); 
    })
    ).subscribe();
    },

    deleteProduct(id :string , files_name : string[]) : void {
    productsService.deleteProduct(id).subscribe();
    const products = store.products().filter((product) => product.id !== id);
    patchState(store , ({products}));
    files_name.map((file_name) => {
    this.removeUploadedProductImage(file_name);
    })
    },

    uploadProductImage(file : File) : void { 
        imageConverterService.compressAndPreview(file).pipe(
        switchMap((files) => {
        return  productsService.uploadProductImage(files.fileName, files.compressedFile).pipe(
        tap((data) => {
        const file_url = data?.file_url;
        const file_name = data?.file_name;
        if(file_url && file_name) {
        const uploadedFiles = 
        [...store.uploadedFiles(),{previewUrl : files.previewUrl , file_name ,file_url}];
        patchState(store , ({uploadedFiles}));
        }
        })
        )
        })
        ).subscribe()
        },
    
    removeUploadedProductImage(fileName : string) : void {
    productsService.removeUploadedProductImage(fileName).subscribe()
    const uploadedFiles = store.uploadedFiles().filter((item) => item.file_name !== fileName);
    patchState(store , ({uploadedFiles}));
    }, 
    
 
    isOpenUpsertProduct(isUpsertProduct : boolean , category : string) : void {
    patchState(store , {isUpsertProduct , category , });
    },

    closeUpsertProduct() : void {
    patchState(store , ({editedProduct : undefined , uploadedFiles : []}));
    this.isOpenUpsertProduct(false , '');
    },
    
    getEditedProduct(editedProduct : Product) : void {
    const uploadedFiles =  editedProduct.images.map(({img_name ,img_url}) => ({ 
    previewUrl :img_url,
    file_url : img_url,
    file_name :img_name ,
    }
    ));
    patchState(store , ({editedProduct , uploadedFiles}));
    this.isOpenUpsertProduct(true , editedProduct.category);
    },
    
    initProductStatus(status: ProductInventoryStatus): string {
        if(status === 'INSTOCK') return 'success';
        if(status === 'LOWSTOCK') return 'warn';
        if(status === 'OUTSTOCK') return 'danger';
        return 'Secondary';
    },

    }
    })
)