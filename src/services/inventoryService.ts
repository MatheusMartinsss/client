import api from "@/utils/api"

export const ListInventorys = async () => {
    try {
        const response = await api.get(`/inventory`);
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
}

export const findOneInventory = async (inventoryId: number, includeArchived: boolean = false, searchBy: string, from: string, to: string, actives: boolean = true) => {
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