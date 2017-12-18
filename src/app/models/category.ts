export class Category {
    id: number;
    description: string;
    
    constructor(id?:number, description?: string) {
        this.id = id;
        this.description = description;
    }
    public static getData(): Category[]{
        return [
            new Category(1, 'Housing'),
            new Category(2, 'Transportation'),
            new Category(3, 'Entaitement'),
            new Category(4, 'Personal Care'),
            new Category(5, 'Loans'),
            new Category(6, 'Food')];
    }
}
