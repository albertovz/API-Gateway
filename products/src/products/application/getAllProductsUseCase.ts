import { Product } from "../domain/entities/product";
import { ProductRepository } from "../domain/repositories/productRepository";

export class GetAllProductsUseCase {
    constructor(readonly productRepository: ProductRepository) { }

    async getAll(): Promise<Product[] | null> {
        try {
            const listProducts = await this.productRepository.getAllProducts();
            return listProducts;
        } catch (error) {
            return null;
        }
    }
}