import { IItem } from "../items/item";

export interface inventory {
    id: number;
    name: string;
    description: string;
    totalVolumeM3?: number;
    createdAt?: Date;
    updatedAt?: Date;
    items?: IItem[]
}

export interface ICreateInventory extends Partial<inventory> {}