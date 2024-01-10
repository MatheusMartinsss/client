import api from "@/utils/api"

export const ListAutexService = async () => {
    try {
        const response = await api.get('/autex')
        return response.data
    } catch (error) {
        throw error
    }
}