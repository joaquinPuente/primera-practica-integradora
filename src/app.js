// Importa las bibliotecas necesarias
import express from "express";
import homeRouter from './routers/api/home.router.js';
import productRouter from './routers/api/products.router.js';
import cartRouter from './routers/api/cart.router.js';
import chatRouter from './routers/api/chat.router.js';
import path from 'path';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const PORT = 3000;

// Configura Express normalmente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', homeRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', chatRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});


export default app;
