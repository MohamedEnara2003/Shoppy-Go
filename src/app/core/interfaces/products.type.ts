export type ProductInventoryStatus = "INSTOCK" | "LOWSTOCK" | "OUTSTOCK" ;


export interface ProductImagesType {
    img_url : string,
    img_name : string,
}

export interface ProductSize{
    size_id : number;
    size_type : string;
    size_stock : number;
}

export interface Product {
    id?: string;
    created_at?: string; 
    updated_at?: string; 
    title: string;
    description: string;
    category: string;
    type: string;
    price: number;
    final_price: number;
    discount: number;
    stock_status: ProductInventoryStatus;
    images: ProductImagesType[];
    rating: number;
    tags: string[];
    stock?: number;
    color: string;
    brand : string,
    sizes: ProductSize[];
}
