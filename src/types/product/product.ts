import { IItem } from "../items/item";

export interface IProduct {
    id: number | null;
    commonName?: string;
    scientificName?: string;
    description?: string;
    volumeM3?: number;
    createdAt: Date;
    updatedAt: Date;
    items?: IItem[];
}

export interface ICreateProduct extends Partial<IProduct> { }