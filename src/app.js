import express from "express";
import {Server} from 'socket.io';
import {engine} from 'express-handlebars';
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";
import __dirname from "./utils.js";
import ProductManager from "./productManager.js";


const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const expresServer = app.listen(PORT, ()=>{console.log(`Corriendo app en el puerto ${PORT}`);});
const socketServer = new Server(expresServer);

socketServer.on('connection',socket=>{
    console.log('cliente conectado desde el front');
    
    const productos = p.getProducts();
    socket.emit('productos', productos);
    
    socket.on('agregarProducto', producto=>{
        const result = p.addProduct({...producto});
    });
    // socket.on('eliminarProducto', producto=>{
    //     const result = p.deleteProduct({...producto});
    // });
});