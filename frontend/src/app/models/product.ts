export interface Product {
    id: number;
    name: string;
    category: string;
    state: string;
    netto: number;
    clientprice: number;
    sellprice?: number;
    margin?: number;
}
