import dontenv from "dotenv";
import mariadb from "mariadb";
import { Signale } from "signale";
import fs from "fs";
import path from 'path'; // Importa los módulos 'fs' y 'path'

const signale = new Signale();
dontenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 3307, // Agrega el puerto correspondiente aquí
    connectionLimit: 10,
});

export async function createTables() {
    let tablesCreated = false;
    try {
        const conn = await pool.getConnection();

        // Comprueba si las tablas ya existen
        const checkOrdersQuery = "SHOW TABLES LIKE 'orders';";

        const orders = await conn.query(checkOrdersQuery);

        // Si no se encontraron resultados, las tablas no existen y se pueden crear
        if (Array.isArray(orders)) {
            if (orders.length === 0) {
                const initializeFilePath = path.join(__dirname, 'initialize.sql');
                const initializeFileContent = fs.readFileSync(initializeFilePath, "utf-8");
                const sqlStatements = initializeFileContent.split(';');

                for (const sqlStatement of sqlStatements) {
                    if (sqlStatement.trim() !== '') {
                        await conn.query(sqlStatement);
                    }
                }
                tablesCreated = true;
            } else {
                tablesCreated = false;
            }
        }
        conn.release();
    } catch (error) {
        signale.error("Error al crear la tabla de Ordenes:", error);
    }
    return tablesCreated;
}

export async function insertData() {
    try {
        // Simulación de generación de órdenes con índices aleatorios de 1 a 10
        const orders = [];
        for (let i = 0; i < 10; i++) {
            const randomProductIndex = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
            const randomCustomerIndex = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10

            const quantity = Math.floor(Math.random() * 3) + 1; // Asigna un valor aleatorio entre 1 y 3 a la variable 'quantity'

            const order = {
                product_id: randomProductIndex,
                customer_id: randomCustomerIndex,
                quantity: quantity,
            };
            orders.push(order);
        }

        for (const order of orders) {
            await query('INSERT INTO orders (product_id, customer_id, quantity) VALUES (?, ?, ?)', [order.product_id, order.customer_id, order.quantity]);
        }

        return true;
    } catch (error) {
        console.error('Error al insertar datos:', error);
        return false;
    }
}

export async function query(sql: string, params: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.query(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}
