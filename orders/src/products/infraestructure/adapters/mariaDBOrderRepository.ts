import { query } from "../../../database/mysql";
import { Order } from "../../domain/entities/order";
import { OrderRepository } from "../../domain/repositories/orderRepository";

export class MariaDBOrderRepository implements OrderRepository {

    async getAllOrders(): Promise<Order[] | null> {
        const sql = `SELECT * FROM orders`;
        try {
            const result = await query(sql, []);
            if (result.length === 0) {
                return null; // Si no hay resultados, se devuelve null
            }
            return result.map((orders: any) =>
                new Order(
                    orders.id,
                    orders.product_id,
                    orders.customer_id,
                    orders.quantity
                )
            );
        } catch (error) {
            console.error("Error al obtener la lista de ordenes:", error);
            return null;
        }
    }
}
