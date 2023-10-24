import { IItem } from "../items/item";

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    volumeTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
    items?: IItem[]
}