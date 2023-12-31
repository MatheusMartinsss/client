
export interface IItem {
    id?: number;
    scientificName: string;
    treeId: string;
    commonName: string;
    code: number | undefined;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    meters: number;
    section: string;
    archived: boolean
    inventory?: number;
    archivedAt: Date
    description?: string;
    product_id: number;
    createdAt: Date;
    updatedAt: Date;
    product: number | undefined;
    volumeM3: number;
    removedAt: Date;
}

type OrderOptions = 'asc' | 'desc'
export interface ItemQuerys {
    orderBy?: string
    order?: OrderOptions
    to?: Date | null;
    from?: Date | null;
    includeArchived?: boolean;
    searchBy?: string;
    inventoryId?: string;
}