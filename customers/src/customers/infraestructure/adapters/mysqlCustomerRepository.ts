import { query } from "../../../database/mysql";
import { Customer } from "../../domain/entities/customer";
import { CustomerRepository } from "../../domain/repositories/customerRepository";

export class MysqlCustomerRepository implements CustomerRepository {

    async getAllCustomers(): Promise<Customer[] | null> {
        const sql = `SELECT * FROM customers`;
        try {
            const result = await query(sql, []);
            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((customers: any) =>
                new Customer(
                    customers.id,
                    customers.name,
                    customers.lastname,
                    customers.email
                )
            );
        } catch (error) {
            console.error("Error al obtener la lista de customers:", error);
            return null;
        }
    }
}
