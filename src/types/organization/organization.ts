

export interface IOrganization {
    id?: number;
    cnpj: string
    name: string
    email: string;
    tenant_id?: string;
    address: IAddress 
}

type IAddress = {
    id?: number;
    street: string;
    number: string
    neighborhood: string;
    postalCode: string;
    state: string;
}
