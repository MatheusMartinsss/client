import { ItemQuerys } from "@/types/items/item";
import api from "@/utils/api"
import saveAs from "file-saver";


export const ListItems = async ({ inventoryId, includeArchived = false, searchBy, createdAtFrom, createdAtTo, order, orderBy, page, limit }: ItemQuerys) => {
    try {
        const response = await api.get(`/item`, {
            params: {
                inventoryId,
                includeArchived,
                searchBy,
                createdAtFrom,
                createdAtTo,
                order,
                orderBy,
                page,
                limit
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

export const getItemsReport = async ({ includeArchived, from, to, inventorysIds, productsIds }: {
    includeArchived?: boolean,
    from?: string,
    to?: string,
    inventorysIds?: string,
    productsIds?: string
}): Promise<void> => {
    try {
        const response = await api.get('/item/reports/items', {
            responseType: 'blob',
            params: {
                includeArchived: includeArchived,
                createdAtFrom: from,
                createdAtTo: to,
                inventorysIds,
                productsIds
            }

        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, 'relatorio.pdf');
    } catch (error) {
        console.error('Erro ao baixar o arquivo', error);
    }
};