import { IOrganization } from "@/types/organization/organization";
import api from "@/utils/api"
import { Unauthorized } from "@/utils/errors"
import { AxiosError } from "axios"

export const authService = async (name: string, password: string) => {
    try {
        const response = await api.post('/auth', { name, password });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response && err.response.status === 401) {
            throw new Unauthorized('Acesso negado!');
        } else {
            throw error;
        }
    }
};

export const singUpService = async (body: IOrganization) => {
    try {
        const response = await api.post('/signup', body)
        return response.data
    } catch (error) {
        const err = error as AxiosError;
        if (err.response && err.response.status === 401) {
            throw new Unauthorized('Acesso negado!');
        } else {
            throw error;
        }

    }
}