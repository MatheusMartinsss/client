import api from "@/utils/api"
import { Unauthorized } from "@/utils/errors"
import { AxiosError } from "axios"

export const authService = async (cnpj: string, password: string) => {
    try {
        const response = await api.post('/auth/organization', { cnpj, password });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log(err.response)
        if (err.response && err.response.status === 401) {
            throw new Unauthorized('Acesso negado!');
        } else {

            throw error;
        }
    }
};