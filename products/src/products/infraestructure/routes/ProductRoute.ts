import express from "express";
import { getAllProductsController } from "../dependencies";

export const productRoute = express.Router();

productRoute.get(
    "/list", getAllProductsController.getAll.bind(getAllProductsController));