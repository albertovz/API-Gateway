import { MariaDBOrderRepository } from "./adapters/mariaDBOrderRepository";

import { GetAllOrdersUseCase } from "../application/getAllOrdersUseCase";
import { GetAllOrdersController } from "./controllers/getAllOrdersController";

export const mariaDBOrderRepository = new MariaDBOrderRepository();

//Casos de uso
export const getAllOrdersUseCase = new GetAllOrdersUseCase(mariaDBOrderRepository);

//Controladores
export const getAllOrdersController = new GetAllOrdersController(getAllOrdersUseCase);