import { query } from "../../../database/mysql";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/productRepository";

export class MariaDBProductRepository implements ProductRepository {

    async getAllProducts(): Promise<Product[] | null> {
        const sql = `SELECT * FROM products`;
        try {
            const result = await query(sql, []);
            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((products: any) =>
                new Product(
                    products.id,
                    products.name,
                    products.price
                )
            );
        } catch (error) {
            console.error("Error al obtener la lista de productos:", error);
            return null;
        }
    }
}
