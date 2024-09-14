// const ProductManager = require("./productManager");

import ProductManager from "../src/productManager.js";

const productos = new ProductManager();
 
//array vacio
console.log(productos.getProducts());

//agrego primer producto
console.log(productos.addProduct('Cosas de Cabrito', 'El unipersonal de stand up que estabas buscando', 4000, 'Imagen-Cosas-de-Cabrito', 'abc123', 30));
//agrego segundo producto
console.log(productos.addProduct('Desastre', 'El unico show que cumple con el etiquetado frontal', 3000, 'Imagen-Desastre', 'abc456', 50));
//agrego tercer producto
console.log(productos.addProduct('Excesos', 'Sabemos que los excesos no estan bien, pero nos gustan', 2500, 'Imagen-Excesos', 'abc789', 60));
//agrego cuarto producto
console.log(productos.addProduct('Haciendo Stand Up', 'Hacemos lo que nos hace feliz para hacerte reir', 4500, 'Imagen-Haciendo', 'abc001', 56));
//agrego quinto producto
console.log(productos.addProduct('Stand Up Nigth', 'Noches a pura risa con los mejores comediantes', 5000, 'Imagen-StandUpNigth', 'abc002', 60))
//agrego Sexto producto
console.log(productos.addProduct('Barrilete Comico', 'Humor con ironia, venite o no vengas', 5000, 'Imagen-Barrilete', 'abc003', 56))
//agrego Septimo producto
console.log(productos.addProduct('Una para todos', 'Una risa para todos, por que la risa es el otro', 4500, 'Imagen-UPT', 'abc004', 56))
//agrego octavo producto
console.log(productos.addProduct('Carambola', 'Un show impredecible, estadisticamente insuperable', 4000, 'Imagen-Carambola', 'abc006', 100))
//agrego noveno producto
console.log(productos.addProduct('El kaputt', 'El desafio de los comediantes, la desicion del publico', 2000, 'Imagen-Kaputt', 'abc007', 47))
//agrego decimo producto
console.log(productos.addProduct('Otra Orbita', 'Reirte te transporta, te cambia, te saca de la rutina, veni a viajar', 3500, 'Imagen-OtraOrbita', 'abc008', 80))

//Producto con dato faltante
console.log(productos.addProduct('After Wakanda', 3000, 'Imagen-Wakanda', 'abc457', 35));

//array con producto
console.log(productos.getProducts());

//Validacion code repetido
productos.addProduct('Desastre', 'El unico show que cumple con el etiquetado frontal', 3000, 'Imagen-Desastre', 'abc456', 50);

//Consulta por ID
productos.getProductById(2)

//Consulta de producto por ID
productos.getProductById(4)


//actualiza el precio del producto y se comprueba que no se puede modificar el ID
const productoActualizar = {
    "id": 30,
    "price": 2500,
}

console.log(productos.updateProduct(1, productoActualizar));