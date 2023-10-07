import api from "@/utils/api"


export const ListItems = async ({ inventoryId, includeArchived = false, searchBy, from, to }: {
    inventoryId?: string, includeArchived?: boolean, searchBy?: string, from?: string, to?: string
}) => {
    try {
        const response = await api.get(`/item`, {
            params: {
                inventoryId,
                includeArchived,
                searchBy,
                from,
                to
            }
        });
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};