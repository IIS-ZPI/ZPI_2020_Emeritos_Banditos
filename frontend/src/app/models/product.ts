export interface Product {
    name: string;
    category: string;
    state: string;
    quantity: number;
    netto: number;
    clientprice: number;
    sellprice?: number;
    margin?: number;
    id?: number;
}
