export interface Product {
    name: string;
    category: string;
    state: string;
    netto: number;
    clientprice: number;
    id?: number;
    sellprice?: number;
    margin?: number;
}
