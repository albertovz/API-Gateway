import { Customer } from "../domain/entities/customer";
import { CustomerRepository } from "../domain/repositories/customerRepository";

export class GetAllCustomersUseCase {
    constructor(readonly customerRepository: CustomerRepository) { }

    async getAll(): Promise<Customer[] | null> {
        try {
            const listCustomers = await this.customerRepository.getAllCustomers();
            return listCustomers;
        } catch (error) {
            return null;
        }
    }
}