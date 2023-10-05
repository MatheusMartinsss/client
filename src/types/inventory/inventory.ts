import { IItem } from "../items/item";

export interface inventory {
    id: number;
    name: string;
    description: string;
    volumeTotal?: number;
    createdAt?: Date;
    updatedAt?: Date;
    items?: IItem[]
}