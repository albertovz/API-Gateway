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
        const checkCustomersQuery = "SHOW TABLES LIKE 'customers';";

        const customers = await conn.query(checkCustomersQuery);

        // Si no se encontraron resultados, las tablas no existen y se pueden crear
        if (Array.isArray(customers)) {
            if (customers.length === 0) {
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

        for (const customer of customers) {
            await query('INSERT INTO customers (name, lastname, email) VALUES (?, ?, ?)', [customer.name, customer.lastname, customer.email]);
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
