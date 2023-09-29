


import api from "@/utils/api"


export const authService = async (email: string, password: string) => {

    try {

        const response = await api.post('/auth', { email, password })

        return response.data

    } catch (error) {
        return error
    }
}