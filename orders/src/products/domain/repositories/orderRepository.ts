import { Order } from "../entities/order";

export interface OrderRepository {

    getAllOrders(): Promise<Order[] | null>;

}