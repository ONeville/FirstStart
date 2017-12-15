export class Ledger {
    id: number;
    account: string;
    category: string;
    item: string;
    projectedAmount: number;
    actualAmount: number;
    periodicity: string;
    memo: string = '';
}
