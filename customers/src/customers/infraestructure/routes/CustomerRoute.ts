import express from "express";
import { getAllCustomersController } from "../dependencies";

export const customerRoute = express.Router();

customerRoute.get(
    "/list", getAllCustomersController.getAll.bind(getAllCustomersController));


export default customerRoute;
