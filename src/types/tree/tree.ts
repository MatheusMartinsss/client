import { IAutex } from "../autex/autex";
import { ICreateItem } from "../items/item";
import { IProduct } from "../product/product";

export interface ITree {
    id?: number;
    range: number;
    code: string;
    scientificName: string;
    autex?: IAutex
    commonName: string;
    dap: number;
    meters: number;
    volumeM3: number
    product?: IProduct
    createdAt?: Date;
    updatedAt?: Date;
    product_id: number
    autex_id: number
}

export interface ICreateTree {
    id: number | null
    range: number;
    code: string;
    scientificName: string;
    autex?: IAutex
    commonName: string;
    dap: number;
    meters: number;
    volumeM3: number
    createdAt?: Date;
    updatedAt?: Date;
    product_id: number | null
    autex_id: number
}

export interface ICutFell {
    id?: number
    meters: number
    autex_id: number;
    dap: number;
    product_id: number;
    inventory_id: number;
    code: string;
    commonName: string;
    scientificName: string;
    volumeM3: number
    items: ICreateItem[]
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