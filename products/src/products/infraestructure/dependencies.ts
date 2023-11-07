import { MariaDBProductRepository } from "./adapters/mariaDBProductRepository";

import { GetAllProductsUseCase } from "../application/getAllProductsUseCase";
import { GetAllProductsController } from "./controllers/getAllProductsController";

export const mariaDBProductRepository = new MariaDBProductRepository();

//Casos de uso
export const getAllProductsUseCase = new GetAllProductsUseCase(mariaDBProductRepository);

//Controladores
export const getAllProductsController = new GetAllProductsController(getAllProductsUseCase);