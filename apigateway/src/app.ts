import express from 'express';
import { Signale } from 'signale';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const signale = new Signale();
app.use(express.json());

const port = process.env.PORT;

const productsProxy = createProxyMiddleware('/products', {
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/products': '', // Cambiar el path base de la solicitud
    },
});

const customersProxy = createProxyMiddleware('/customers', {
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/customers': '', // Cambiar el path base de la solicitud
    },
});

const ordersProxy = createProxyMiddleware('/orders', {
    target: 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: {
        '^/orders': '', // Cambiar el path base de la solicitud
    },
});

app.use('/products', productsProxy);
app.use('/customers', customersProxy);
app.use('/orders', ordersProxy);

// Iniciar el servidor
app.listen(port, () => {
    signale.success(`API Gateway en el puerto ${port}`);
});
