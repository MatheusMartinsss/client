import { ICreateItem, IItem } from "../items/item";

export enum transactionTypes {
    ADD = 'add',
    REMOVE = 'remove',
    FELL = 'fell'
}

export interface ITransacation {
    id: number;
    transactionType: transactionTypes;
    createdAt: Date;
    updatedAt: Date;
    removedAt?: Date;
    archivedAt: Date;
    user: number;
    transactionItems?: ITransactionItems[]
    volumeTotal: number
}

export interface ITransactionItems {
    id?: number;
    transaction_id?: number;
    item_id?: number;
    item?: IItem
    removedAt?: Date;
    createdAt: Date;
    transaction?: ITransacation
}

export interface ICreateTransaction {
    items: ICreateItem[]
    document?: string
    archivedAt?: Date;
    type: transactionTypes
    inventory_id: number;
}