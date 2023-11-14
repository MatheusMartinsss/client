import { IItem } from "../items/item";

export enum transactionTypes {
    ADD = 'add',
    REMOVE = 'remove'
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