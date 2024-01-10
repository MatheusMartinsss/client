import { IProduct } from "../product/product";

export interface ITree {
    id?: number;
    range: number;
    code: number;
    scientificName: string;
    commonName: string;
    dap: number;
    meters: number;
    volumeM3: number
    product?: IProduct
    createdAt?: Date;
    updatedAt?: Date;
    product_id: number
    autex_id: number;
}

export interface IQueryTree {
    autexIds?: string
    page?: number
    limit?: number;
    count?: number;
    productsIds?: string
    includeItems?: boolean
}