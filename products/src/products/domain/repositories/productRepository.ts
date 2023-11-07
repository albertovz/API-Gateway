import { Product } from "../entities/product";

export interface ProductRepository {

    getAllProducts(): Promise<Product[] | null>;

}