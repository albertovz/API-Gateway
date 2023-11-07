import express, { Request, Response } from 'express';
import { CustomersService } from './customersService';

const app = express();
const port = 3002; // Asigna el puerto que deseas utilizar para este servicio

app.get('/', async (req: Request, res: Response) => {
    res.send('Estoy corriendo el servicio de Clientes')
});

app.get('/customers', async (req: Request, res: Response) => {
    try {
        const customers = await CustomersService.getCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

app.listen(port, () => {
    console.log(`Servidor de clientes iniciado en el puerto ${port}`);
});

export default app;
