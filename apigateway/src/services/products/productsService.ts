import { query } from "../../database/mysql";

export const productsService = {
    getProducts: async () => {
        try {
            const queryResult = await query('SELECT * FROM products', []);

            if (!queryResult) {
                return [];
            }

            // Suponiendo que la consulta devuelve una matriz de objetos de producto
            return queryResult.map((row: any) => ({
                id: row.id,
                name: row.name,
                price: row.price,
            }));
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    },
};
