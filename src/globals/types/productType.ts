import { Status } from "./types"

export interface Product{
    id: string,
    productName: string,
    productDescription: string,
    productPrice: number,
    productStockQty: number,
    productImageUrl: string,
    createdAt: string,
    categoryId: string,
    user: User
    category: Category        
}

interface User{
    
    id: string,
    username: string,
    email: string
}

interface Category{
    id: string,
    categoryNam: string
}

export interface ProductState{
    product : Product[],
    status : Status,
    singleProduct : Product | null
}