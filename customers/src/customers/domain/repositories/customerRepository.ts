import { Customer } from "../entities/customer";

export interface CustomerRepository {

    getAllCustomers(): Promise<Customer[] | null>;

}