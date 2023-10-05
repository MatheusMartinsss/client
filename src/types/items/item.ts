
export interface IItem {
    id?: number;
    name: string;
    code: number;
    archived: boolean;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    meters: number;
    section: string;
    inventory: number;
    description: string;
    archivedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    product: number;
    volumeM3: number;
    removedAt: Date;
}