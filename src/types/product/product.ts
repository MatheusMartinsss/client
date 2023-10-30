import { IItem } from "../items/item";

export interface IProduct {
    id?: number | undefined;
    commonName?: string;
    scientificName?: string;
    description?: string;
    volumeTotal?: number;
    createdAt: Date;
    updatedAt: Date;
    items?: IItem[];
}

export interface ICreateProduct extends Partial<IProduct> { }