import { transactionTypes } from "@/types/transaction/transaction";
import api from "@/utils/api"


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