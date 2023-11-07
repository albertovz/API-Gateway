import { Response, Request } from "express";
import { GetAllProductsUseCase } from "../../application/getAllProductsUseCase";

export class GetAllProductsController {
    constructor(readonly getAllProductsUseCase: GetAllProductsUseCase) { }

    async getAll(req: Request, res: Response) {
        try {
            const listProducts = await this.getAllProductsUseCase.getAll();
            if (listProducts) {
                return res.status(200).json({
                    status: "success",
                    data: listProducts,
                    message: "Lista de productos obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron productos en la base de datos",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener la lista de productos",
            });
        }
    }
}