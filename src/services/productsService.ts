import api from "@/utils/api"


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