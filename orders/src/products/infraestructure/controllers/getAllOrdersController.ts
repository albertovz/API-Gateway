import { Response, Request } from "express";
import { GetAllOrdersUseCase } from "../../application/getAllOrdersUseCase";

export class GetAllOrdersController {
    constructor(readonly getAllOrdersUseCase: GetAllOrdersUseCase) { }

    async getAll(req: Request, res: Response) {
        try {
            const listOrders = await this.getAllOrdersUseCase.getAll();
            if (listOrders) {
                return res.status(200).json({
                    status: "success",
                    data: listOrders,
                    message: "Lista de ordenes obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron ordenes en la base de datos",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de ordenes",
            });
        }
    }
}