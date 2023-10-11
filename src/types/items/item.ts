
export interface IItem {
    id?: number;
    name: string;
    code: number | undefined;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    meters: number;
    section: string;
    inventory?: number;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    product: number | undefined;
    volumeM3: number;
    removedAt?: Date;
}