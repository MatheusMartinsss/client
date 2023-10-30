import { ICreateProduct, IProduct } from "@/types/product/product";
import api from "@/utils/api"


export const createProduct = async (body: ICreateProduct): Promise<IProduct> => {
    try {
        const response = await api.post('/product', { ...body })
        return response.data
    } catch (error) {
        throw new Error()
    }
}

export const ListProducts = async ({ includeVolume, includeRemoved }: { includeVolume?: boolean, includeRemoved?: boolean }) => {
    try {
        const response = await api.get(`/product`, {
            params: {
                includeRemoved,
                includeVolume
            }
        });
        return response.data;
    } catch (error) {
        console.log('error', error)
    }
};