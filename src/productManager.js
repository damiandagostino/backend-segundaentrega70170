// const fs = require('fs');
import fs from 'fs';

class ProductManager {
    #products;
    #path;
    // se declara el inicio del ID en 0
    static id = 0;
    // se declara el constructor del array de productos vacio
    constructor() {
        this.#path = './src/data/productos.json';
        this.#products = this.#leerProductosInFile();
    }

    #asignarIdProducto(){
        //Id autoincremental automatico
        let id = 1;
        if (this.#products.length != 0)
        id = this.#products[this.#products.length - 1].id +1;
    return id;
    }
    //Se ingresa en el archivo json o base a leer el array de productos
    #leerProductosInFile(){
        try{
            if(fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
                let msg = "no se pudo leer";
                return msg;
        }catch (error){
            console.log(`Ocurrio un error al leer el archivo de productos, ${error}`);
        }
    }
    //realiza el guardado de los productos 
    #guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        }catch(error){
            console.log(`Ocurrio un error al guardar,${error}`)
        }
    }

    //funcion para añadir productos nuevos al array
    addProduct({title, description, price, thumbnail=[], code, stock, category, status = true}) {
            let msg = "Ocurrio un error";
            //validacion de que todos los atributos del array se encuentren con datos
            if(!title || !description ||!price || !code || !stock || !category)
            msg = 'Debe completarse todos los campos son obligarios, intente nuevamente';
            else{
            //Validacion que el code no se repite en los nuevos productos.
            const codeRepetido = this.#products.some(p => p.code == code);
            if(codeRepetido)
                msg = `El codigo ${code} esta repetido`;
            else{
            // ID progesivo automatico e incremental con cada producto agregado
            ProductManager.id = ProductManager.id +1;
            const idProducto = ProductManager.id;
            const id = this.#asignarIdProducto();

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status
        }
        this.#products.push(newProduct);
        this.#guardarArchivo();
        msg = {
            msg:'Producto agregado exitosamente',
            producto: newProduct
        }
    }
    }

        return msg
    }

    getProducts(limit = 0) {
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0,limit);
        return this.#products;
    }

    getProductById(id) {
        let status = false;
        let respuesta = `El producto con id ${id} no existe`
        const producto = this.#products.find((p) => p.id === id);
        if(producto){
            status = true;
            respuesta = producto
        }
        return {status, respuesta}
    }

    updateProduct(id, objetUpDate){
        let result = `El id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id);
        if (index !== -1){
            const{id, ...rest} = objetUpDate;
            const propiedadesPermitidas = ['title', 'description', 'price', 'thumbnail', 'code', 'stock', 'category', 'status'];
            const propiedadesActualizadas = Object.keys(rest)
            .filter(propiedad => propiedadesPermitidas.includes(propiedad))
            .reduce((obj, key)=>{
                obj[key] = rest[key];
                return obj;
            },{});
            this.#products[index] = {...this.#products[index], ...propiedadesActualizadas};
            this.#guardarArchivo();
            result ={
                msg: 'El archivo se actualizo con exito',
                producto: this.#products[index]
            };
        }
        return result;
    }

    deleteProduct(id){
        let msg = `El id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p=> p.id !== id);
            this.#guardarArchivo();
            msg = 'Producto Eliminado';
        }

        return msg
    }

}


export default ProductManager;

