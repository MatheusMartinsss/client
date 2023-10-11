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
    user: number;
    transactionItems?: IItem[]
    volumeTotal: number
}