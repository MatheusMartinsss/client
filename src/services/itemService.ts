import { ItemQuerys } from "@/types/items/item";
import api from "@/utils/api"
import saveAs from "file-saver";


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

export const getItemsReport = async ({ includeArchived, from, to, inventorysIds, productsIds }: {
    includeArchived?: boolean,
    from?: Date | null,
    to?: Date | null,
    inventorysIds?: string,
    productsIds?: string
}): Promise<void> => {
    try {
        const response = await api.get('/item/reports/items', {
            responseType: 'blob',
            params: {
                includeArchived: includeArchived,
                from,
                to,
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