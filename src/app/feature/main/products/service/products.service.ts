import { inject, Injectable } from "@angular/core";
import { SingleTonApiService } from "../../../../core/services/single-ton-api.service";
import { Observable } from "rxjs";
import { Product } from "../../../../core/interfaces/products.type";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private readonly singleTonApi = inject(SingleTonApiService);
    private readonly TableAndBucket: string = "products"

    getProducts() : Observable<Product[]> {
    return this.singleTonApi.select(this.TableAndBucket);
    }

    getProductById(id : string) : Observable<Product> {
    return this.singleTonApi.selectById(this.TableAndBucket , id);
    }
    
    createProduct(product : Product) : Observable<Product>{
    return this.singleTonApi.insert(this.TableAndBucket , product);
    }

    updateProduct(product : Product , id : string) : Observable<Product>{
    return this.singleTonApi.update(this.TableAndBucket , product , id);
    }
    
    deleteProduct(id : string) : Observable<void> {
    return this.singleTonApi.deleteById(this.TableAndBucket , id)
    }
    uploadProductImage(filePath: string, file : File) : Observable<{file_url: string;file_name: string} | undefined> {
    return this.singleTonApi.uploadAndGetPublicUrl(this.TableAndBucket , filePath , file);
    }

    removeUploadedProductImage(filePath: string) : Observable<void>{
    return this.singleTonApi.removeStoragFile(this.TableAndBucket , filePath);
    }

}