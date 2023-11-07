export class Order {
    constructor(
        readonly id: number,
        readonly product_id: number,
        readonly customer_id: number,
        readonly quantity: number
    ) { }
}