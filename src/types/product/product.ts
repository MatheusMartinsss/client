import { IItem } from "../items/item";

export interface IProduct {
    id?: number;
    commonName?: string;
    scientificName?: string;
    description?: string;
    volumeTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
    items?: IItem[]
}