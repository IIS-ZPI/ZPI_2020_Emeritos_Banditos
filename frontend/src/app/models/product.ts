export interface Product {
    name: string;
    category: string;
    state: string;
    netto: number;
    clientprice: number;
    sellprice?: number;
    margin?: number;
    id?: number;
}
