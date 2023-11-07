import { query } from '../../database/mysql';

export const CustomersService = {
    getCustomers: async () => {
        try {
            const queryResult = await query('SELECT * FROM customers', []);

            if (!queryResult) {
                return [];
            }

            // Suponiendo que la consulta devuelve una matriz de objetos de cliente
            return queryResult.map((row: any) => ({
                id: row.id,
                name: row.name,
                lastName: row.lastname,
                email: row.email,
            }));
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            return [];
        }
    },
};
