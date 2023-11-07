import express from 'express';
import { Signale } from 'signale';
import { customerRoute } from './customers/infraestructure/routes/CustomerRoute';
import { createTables, insertData } from "./database/mysql"; // Asegúrate de importar la función createTables

const app = express();
const signale = new Signale();

const port = 3002; // Asigna el puerto que deseas utilizar para este servicio

app.get("/", (req, res) => {
    const data = `Estoy corriendo el servicio de Clientes`;
    return res.send(data);
});

app.use("/route", customerRoute);

createTables().then((tablesCreated) => {
    if (tablesCreated) {
        signale.success("Las tablas han sido creadas exitosamente");
        insertData()
            .then((success) => {
                if (success) {
                    signale.success('Datos insertados exitosamente');
                } else {
                    signale.error('No se pudieron insertar los datos');
                }
            })
            .catch((error) => {
                signale.error('Ocurrió un error al insertar los datos:', error);
            });
    } else {
        signale.success("Las tablas ya existen");
    }
});


app.listen(port, () => {
    signale.success(`Servidor de clientes iniciado en el puerto ${port}`);
});

export default app;
