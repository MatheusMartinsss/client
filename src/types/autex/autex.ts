import { ITree } from "../tree/tree";

export interface IAutex {
    id?: number;
    code: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    trees: ITree[]
}