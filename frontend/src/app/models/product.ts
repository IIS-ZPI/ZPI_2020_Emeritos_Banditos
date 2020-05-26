export interface Product {
    name: string;
    category: string;
    state: string;
    netto: number;
    clientPrice: number;
    sellPrice?: number;
    margin?: number;
}
