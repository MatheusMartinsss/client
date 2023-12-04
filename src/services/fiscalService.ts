import api from "@/utils/api"
import { Unauthorized } from "@/utils/errors"
import { AxiosError } from "axios"

export const fiscalFindCnpj = async (cnpj: string) => {
    const formatedCnpj = cnpj.replace(/\D/g, '');
    try {
        const response = await api.get(`/fiscal/${formatedCnpj}`);
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