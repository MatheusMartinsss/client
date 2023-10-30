
export interface IItem {
    id?: number;
    scientificName: string;
    commonName: string;
    code: number | undefined;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    meters: number;
    section: string;
    inventory?: number;
    description?: string;
    product_id: number;
    createdAt: Date;
    updatedAt: Date;
    product: number | undefined;
    volumeM3: number;
    removedAt: Date;
}