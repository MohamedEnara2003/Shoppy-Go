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
    const categories = new Set(store.products().map((product) => product.category));
    const categoriesArr = Array.from(categories);
    return categoriesArr;
    }),
    
    types : computed<string[]>(() => {
    const types = new Set(store.products().map((product) => product.type));
    const typesArr = Array.from(types);
    return typesArr;
    }),
    
    brands : computed<string[]>(() => {
    const brands = new Set(store.products().map((product) => product.brand));
    const brandsArr = Array.from(brands);
    return brandsArr;
    }),

    categoryMegaMenuItem : computed<MegaMenuItem[]>(() => {
        const categories = Array.from(new Set(store.products().map((product) => product.category)));
        return categories.map(category => {
            const categoryProducts = store.products().filter(product => product.category === category);
            const categoryTypes = Array.from(new Set(categoryProducts.map(product => product.type)));      
            const groupedTypes = [];
            for (let i = 0; i < categoryTypes.length; i += 2) {
                groupedTypes.push(categoryTypes.slice(i, i + 2));
            }
            return {
                label: category,
                items: groupedTypes.map(typeGroup => [
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
    
    filteringProducts  : computed<Product[]>(() => {
        const category = store.queryCategory();
        const type = store.queryType();
        const brand = store.queryBrand();
        const start = paginatorService.first();
        const rows = paginatorService.rows() + start;

        const products = store.products().filter((product) => 
        (category === '' || product.category === category) &&
        (type === '' || product.type === type) &&
        (brand === '' || product.brand === brand) &&
        (product.final_price >= store.minPrice() && product.final_price <= store.maxPrice()) 
        ).slice(start, rows).sort((a , b) => a.type > b.type ? -1 : 1);
        return products;
    }), 
 
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
    patchState(store ,({productsError : err.message}))
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