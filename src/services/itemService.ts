import { ItemQuerys } from "@/types/items/item";
import api from "@/utils/api"


export const ListItems = async ({ inventoryId, includeArchived = false, searchBy, from, to, order, orderBy }: ItemQuerys) => {
    try {
        const response = await api.get(`/item`, {
            params: {
                inventoryId,
                includeArchived,
                searchBy,
                from,
                to,
                order,
                orderBy
            }
        });
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};

export const findOneItemByCode = async (code: string) => {
    try {
        const response = await api.get(`/item/${code}`, {
            params: {
                findBy: 'code'
            }
        })
        return response.data
    } catch (error) {
        console.log('error', error)
    }

}