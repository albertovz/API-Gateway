import { Order } from "../domain/entities/order";
import { OrderRepository } from "../domain/repositories/orderRepository";

export class GetAllOrdersUseCase {
    constructor(readonly orderRepository: OrderRepository) { }

    async getAll(): Promise<Order[] | null> {
        try {
            const listOrders = await this.orderRepository.getAllOrders();
            return listOrders;
        } catch (error) {
            return null;
        }
    }
}