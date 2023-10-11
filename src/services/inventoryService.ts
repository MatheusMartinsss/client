import api from "@/utils/api"

export const ListInventorys = async ({ includeVolume = false, includeRemoved = false }:
    { includeVolume?: boolean, includeRemoved?: boolean }) => {
    try {
        const response = await api.get(`/inventory`, {
            params: {
                includeVolume,
                includeRemoved
            }
        });
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
}

export const findOneInventory = async ({ inventoryId, includeArchived = false, searchBy, from, to, actives = true }: {
    inventoryId?: number, includeArchived?: boolean, searchBy?: string, from?: string, to?: string, actives?: boolean
}) => {
    try {
        const response = await api.get(`/inventory/${inventoryId}/items`, {
            params: {
                includeArchived,
                searchBy,
                from,
                to,
                actives
            }
        });
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};