

//Creacion del producto
const producto1 =
{
    nombre: 'zapatilla',
    precio: 450,
    id: 1
}
//Visualizar atributos/propiedades del objeto
console.log('nombre: ' + producto.nombre + ' $ ' + producto.precio)

//cambiar valor de un objeto
producto.precio = parseFloat(prompt('ingrese nuevo precio'))


//Funcion constructora "plantilla de objeto"
function Producto(nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
}

const producto2 = new Producto("buzo", 454, 2);

const producto3 = new Producto("remera", 1600, 3);




