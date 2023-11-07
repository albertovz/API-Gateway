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
        const checkProductsQuery = "SHOW TABLES LIKE 'products';";

        const products = await conn.query(checkProductsQuery);

        // Si no se encontraron resultados, las tablas no existen y se pueden crear
        if (Array.isArray(products)) {
            if (products.length === 0) {
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
        signale.error("Error al crear la tabla de Productos:", error);
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

        for (const product of products) {
            await query('INSERT INTO products (name, price) VALUES (?, ?)', [product.name, product.price]);
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
