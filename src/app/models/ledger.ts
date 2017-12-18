export class Ledger {
    id: number;
    account: string;
    categoryId: number;
    category: string;
    itemId: number;
    item: string;
    projectedAmount: number;
    actualAmount: number;
    periodicity: string;
    memo: string = '';
}
