import express from 'express';
import { Signale } from 'signale';
import { OrderRoute } from './products/infraestructure/routes/OrderRoute';
import { createTables, insertData } from "./database/mysql"; // Asegúrate de importar la función createTables

const app = express();
const signale = new Signale();

const port = 3003; // Asigna el puerto que deseas utilizar para este servicio

app.get("/", (req, res) => {
    const data = `Estoy corriendo el servicio de Ordenes`;
    return res.send(data);
});

app.use("/route", OrderRoute);


createTables().then((tablesCreated) => {
    if (tablesCreated) {
        signale.success("La tabla ha sido creada exitosamente");
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
        signale.success("La tabla ya existe");
    }
});


app.listen(port, () => {
    signale.success(`Servidor de ordenes iniciado en el puerto ${port}`);
});

export default app;
