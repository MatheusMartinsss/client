import { IQueryTree } from "@/types/tree/tree"
import api from "@/utils/api"

export const ListTreesService = async ({ autexIds, limit, page }: IQueryTree) => {
    try {
        const response = await api.get('/tree', {
            params: {
                autexIds,
                limit,
                page
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}