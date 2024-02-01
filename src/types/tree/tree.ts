import { IProduct } from "../product/product";

export interface ITree {
    id?: number ;
    range: number;
    code: string;
    scientificName: string;
    commonName: string;
    dap: number;
    meters: number;
    volumeM3: number
    product?: IProduct
    createdAt?: Date;
    updatedAt?: Date;
    product_id: number | null
    autex_id?: number | null
}

export interface IQueryTree {
    autexIds?: string
    page?: number
    limit?: number;
    order?: 'asc' | 'desc';
    orderBy?: string
    count?: number;
    searchBy?: string;
    productsIds?: string
    includeItems?: boolean
}