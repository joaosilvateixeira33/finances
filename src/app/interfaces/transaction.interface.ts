export interface ITransaction{
    id: string;
    value: string;
    type: "entrada" | "saida";
    description: string;
}

export type TTransactionRegisterFormData = Omit<ITransaction, "id">;