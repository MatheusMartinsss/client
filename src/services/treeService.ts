import { IQueryTree, ITree } from "@/types/tree/tree"
import api from "@/utils/api"

export const ListTreesService = async ({ autexIds, limit, page, order, orderBy }: IQueryTree) => {
    try {
        const response = await api.get('/tree', {
            params: {
                autexIds,
                limit,
                page,
                order,
                orderBy
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const CreateTreeService = async (data: ITree[]) => {
    try {
        const response = await api.post('/tree', data)
        return response.data
    } catch (error) {
        throw error

    }
}