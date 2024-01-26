import { Category } from "src/enums/category";

export class UpdateBookDto{
    readonly title:string;
    readonly description:string;
    readonly price:number;
    readonly author:string;
    readonly category:Category
}