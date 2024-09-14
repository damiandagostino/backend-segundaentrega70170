import fs from 'fs';
import ProductManager from './productManager.js';

class CartsManager {
    #carts;
    #path;
    // se declara el inicio del ID en 0
    static id = 0;
    // se declara el constructor del array de productos vacio
    constructor() {
        this.#path = './src/data/carrito.json';
        this.#carts = this.#leerCarritoInFile() || [];
    }

    #asignarIdCarrito(){
        //Id autoincremental automatico
        let id = 1;
        if (this.#carts.length != 0)
        id = this.#carts[this.#carts.length - 1].id +1;
    return id;
    }
    //Se ingresa en el archivo json o base a leer el array de productos
    #leerCarritoInFile(){
        try{
            if(fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
        }catch (error){
            console.log(`Ocurrio un error al leer el archivo de productos, ${error}`);
        }
    }
    //realiza el guardado de los productos 
    #guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        }catch(error){
            console.log(`Ocurrio un error al guardar,${error}`)
        }
    }

    crearCarrito() {
        const newCarts = {
            id: this.#asignarIdCarrito(),
            products: []
        };

        this.#carts.push(newCarts);
        this.#guardarArchivo();

        return newCarts;
    }

    getCartsById(id) {
        const producto = this.#carts.find((p) => p.id == id);
        if(producto)
            return producto;
        else
        return 'Not Found id carrito'
    }

    agregarProductoaCarrito(cid,pid){
        let respuesta = `El carrito con ide ${cid} no existe`;
        const indexCarrito = this.#carts.findIndex(c=> c.id === cid);

        if(indexCarrito!==-1){
            const indexProductoEnCarrito = this.#carts[indexCarrito].products.findIndex(p=> p.id === pid);
            const p = new ProductManager();
            const producto = p.getProductById(pid);

            if(producto.status && indexProductoEnCarrito === -1){
                this.#carts[indexCarrito].products.push({id: pid, 'quantity': 1});
                this.#guardarArchivo();
                respuesta='Nuevo producto agregado';
            } else if (producto.status && indexProductoEnCarrito !==-1){
                    ++this.#carts[indexCarrito].products[indexProductoEnCarrito].quantity;
                    this.#guardarArchivo();
                    respuesta='Nueva unidad de producto agregada';
            }else{
                respuesta =`El producto con id ${pid} no existe`
            }
        }
        return respuesta;
    }
}


export default CartsManager;

