
import { ICreateTransaction } from "@/types/transaction/transaction";
import api from "@/utils/api"
import { AxiosError } from "axios";



export const ListTransactions = async ({ from, to, type }: { from?: Date | null, to?: Date | null, type?: string }) => {
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

export const createTransaction = async (body: ICreateTransaction) => {
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

export const findOneTransaction = async (id: number) => {
    try {
        const response = await api.get(`/transaction/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response.data.status === 409) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Erro interno, entre em contato com o suporte!');
    }
}

export const updateTransaction = async (id: string, body: any) => {

    try {
        const response = await api.patch(`/transaction/${id}`, body)
        return response.data
    } catch (error: any) {
        if (error.response.data.status === 409) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Erro interno, entre em contato com o suporte!');
    }

}

export const deleteTransaction = async (id: string) => {
    try {
        const response = await api.delete(`/transaction/${id}`)
        return response.data
    } catch (error: AxiosError | any) {
        if (error.response.data.status === 409) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Erro interno, entre em contato com o suporte!');
    }
}