
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

export interface ICreateItem {
    scientificName: string;
    commonName: string;
    code: string;
    d1: string;
    d2: string;
    d3: string;
    d4: string;
    meters: string;
    volumeM3: string;
    section: string;
    inventory_id: number;
    product_id: number;
    tree_id: number| null;
}

type OrderOptions = 'asc' | 'desc'
export interface ItemQuerys {
    orderBy?: string
    order?: OrderOptions
    createdAtTo?: string;
    createdAtFrom?: string;
    includeArchived?: boolean;
    searchBy?: string;
    inventorysIds?: string;
    page?: number
    limit?: number;
}