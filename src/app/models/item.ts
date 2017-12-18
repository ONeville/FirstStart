export class Item {
    id: number;
    description: string;
    categoryId: number;

    constructor(id?:number, description?: string, categoryId?: number) {
        this.id = id;
        this.description = description;
        this.categoryId = categoryId;
    }
    public static getData(): Item[]{
        return [
            new Item(1, 'Rent', 1),
            new Item(2, 'Supplies', 1),
            new Item(3, 'Gas/Fuel', 2),
            new Item(4, 'Movie', 3),
            new Item(5, 'Sporting events', 3),
            new Item(6, 'Dining Out', 4),
            new Item(7, 'personal stuff', 4),
            new Item(8, 'Credit Card 1', 5),
            new Item(9, 'Credit Card 2', 5),
            new Item(10, 'Dairy', 6),
            new Item(11, 'African Store', 6),
            new Item(12, 'Groceries', 6)];
    }
}
