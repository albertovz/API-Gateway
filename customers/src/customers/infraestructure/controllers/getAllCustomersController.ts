import { Response, Request } from "express";
import { GetAllCustomersUseCase } from "../../application/getAllCustomersUseCase";

export class GetAllCustomersController {
    constructor(readonly getAllCustomersUseCase: GetAllCustomersUseCase) { }

    async getAll(req: Request, res: Response) {
        try {
            const listCustomers = await this.getAllCustomersUseCase.getAll();
            if (listCustomers) {
                return res.status(200).json({
                    status: "success",
                    data: listCustomers,
                    message: "Lista de Clientes obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron clientes en la base de datos",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de clientes",
            });
        }
    }
}