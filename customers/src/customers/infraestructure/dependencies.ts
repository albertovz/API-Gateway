import { MysqlCustomerRepository } from "./adapters/mysqlCustomerRepository";

import { GetAllCustomersUseCase } from "../application/getAllCustomersUseCase";
import { GetAllCustomersController } from "./controllers/getAllCustomersController";

export const mysqlCustomerRepository = new MysqlCustomerRepository();

//Casos de uso
export const getAllCustomersUseCase = new GetAllCustomersUseCase(mysqlCustomerRepository);

//Controladores
export const getAllCustomersController = new GetAllCustomersController(getAllCustomersUseCase);