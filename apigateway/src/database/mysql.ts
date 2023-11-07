import dontenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";
import fs from "fs";
import path from 'path'; // Importa los módulos 'fs' y 'path'

const signale = new Signale();
dontenv.config();

const dbPort = process.env.DB_PORT || "3306";

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(dbPort),
    waitForConnections: true,
    connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

export async function createTables() {
    let tablesCreated = false;
    try {
        const conn = await pool.getConnection();

        // Comprueba si las tablas ya existen
        const checkProductsQuery = "SHOW TABLES LIKE 'products';";
        const checkCustomersQuery = "SHOW TABLES LIKE 'customers';";
        const checkOrdersQuery = "SHOW TABLES LIKE 'orders';";

        const [products] = await conn.query(checkProductsQuery);
        const [customers] = await conn.query(checkCustomersQuery);
        const [orders] = await conn.query(checkOrdersQuery);

        // Si no se encontraron resultados, las tablas no existen y se pueden crear
        if (Array.isArray(products) && Array.isArray(customers) && Array.isArray(orders)) {
            if (products.length === 0 || customers.length === 0 || orders.length === 0) {
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
        signale.error("Error al crear las tablas:", error);
    }
    return tablesCreated;
}

export async function insertData() {
    try {
        const products = [
            { name: 'Grand Theft Auto V', price: 968.89 },
            { name: 'Rust', price: 409.99 },
            { name: 'Cyberpunk 2077', price: 1299 },
            { name: 'Ark Survival Ascended', price: 825 },
            { name: 'Halo Infinite', price: 1499.99 },
            { name: '7 days to die', price: 225.99 },
            { name: 'Battlefield 2042', price: 1399 },
            { name: 'Tom Clancy\'s Rainbow Six Siege', price: 349 },
            { name: 'Elden Ring', price: 599.99 },
            { name: 'Halo: The Master Chief Collection', price: 799.89 }
            // Puedes seguir añadiendo más juegos a la lista si lo deseas
        ];

        const customers = [
            { name: 'John', lastname: 'Doe', email: 'johndoe@example.com' },
            { name: 'Jane', lastname: 'Smith', email: 'janesmith@example.com' },
            { name: 'Michael', lastname: 'Johnson', email: 'michaeljohnson@example.com' },
            { name: 'Sarah', lastname: 'Williams', email: 'sarahwilliams@example.com' },
            { name: 'Robert', lastname: 'Brown', email: 'robertbrown@example.com' },
            { name: 'Karen', lastname: 'Davis', email: 'karendavis@example.com' },
            { name: 'William', lastname: 'Miller', email: 'williammiller@example.com' },
            { name: 'Emily', lastname: 'Wilson', email: 'emilywilson@example.com' },
            { name: 'David', lastname: 'Moore', email: 'davidmoore@example.com' },
            { name: 'Jennifer', lastname: 'Taylor', email: 'jennifertaylor@example.com' }
            // Agrega más clientes aquí si es necesario
        ];

        const orders = [];
        for (let i = 0; i < 10; i++) {
            const randomProductIndex = Math.floor(Math.random() * products.length);
            const randomCustomerIndex = Math.floor(Math.random() * customers.length);

            const product = products[randomProductIndex];
            const customer = customers[randomCustomerIndex];
            const quantity = Math.floor(Math.random() * 3) + 1; // Asigna un valor aleatorio entre 1 y 3 a la variable 'quantity'

            const order = {
                product_id: randomProductIndex + 1,
                customer_id: randomCustomerIndex + 1,
                quantity: quantity,
                totalPrice: product.price * quantity
            };
            orders.push(order);
        }


        for (const product of products) {
            await query('INSERT INTO products (name, price) VALUES (?, ?)', [product.name, product.price]);
        }

        for (const customer of customers) {
            await query('INSERT INTO customers (name, lastname, email) VALUES (?, ?, ?)', [customer.name, customer.lastname, customer.email]);
        }

        for (const order of orders) {
            await query('INSERT INTO orders (product_id, customer_id, quantity, total_price) VALUES (?, ?, ?, ?)', [order.product_id, order.customer_id, order.quantity, order.totalPrice]);
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
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}