import { IItem } from "@/types/items/item";
import { transactionTypes } from "@/types/transaction/transaction";
import api from "@/utils/api"
import { AxiosError } from "axios";



export const ListTransactions = async ({ from, to, type }: { from?: string, to?: string, type?: string }) => {
    try {
        const response = await api.get(`/transaction`, {
            params: {
                from,
                to,
                type
            }

        });
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};

export const createTransaction = async (body: any) => {
    try {
        const response = await api.post(`/transaction`, body);
        return response.data;
    } catch (error: any) {
        if (error.response.data.status === 409) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Erro interno, entre em contato com o suporte!');
    }
};