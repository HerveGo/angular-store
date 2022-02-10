export class ProductModel {
    id?: string = "";
    name: string = "";
    description: string = "";
    active: boolean = true;
    price: number = 0.0;
    date_created: Date = new Date();
    date_updated: Date = new Date();
}