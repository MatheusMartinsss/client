import { useSearchParams, useRouter } from "next/navigation";

const useFilterUpdater = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilters = (key: string, value: string) => {
        const queryParams = Object.fromEntries(searchParams);
        const newQueryParams = { ...queryParams, [key]: value };
        if (key === 'orderBy') {
            const currentOrder = newQueryParams['order']
            newQueryParams['order'] = currentOrder === 'asc' ? 'desc' : 'asc';
        }
        if ((key === 'includeArchived' && value === 'false') || value === '') {
            delete newQueryParams[key];
        }

        const newSearchParams = new URLSearchParams(newQueryParams);
        router.push(`?${newSearchParams}`);
    };

    return updateFilters;
};

export default useFilterUpdater;