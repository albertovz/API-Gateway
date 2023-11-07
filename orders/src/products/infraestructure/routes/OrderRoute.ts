import express from "express";
import { getAllOrdersController } from "../dependencies";

export const OrderRoute = express.Router();

OrderRoute.get(
    "/list", getAllOrdersController.getAll.bind(getAllOrdersController));