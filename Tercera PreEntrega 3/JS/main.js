const productos = [{
    id: 1,
    nombre: "Joggers",
    precio: 6399,
},
{
    id: 2,
    nombre: "polos",
    precio: 3499,
   
},
{
    id: 3,
    nombre: "vinchas",
    precio: 5439,
    
},
{
    id: 4,
    nombre: "peinetas",
    precio: 3729,
   
},
{
    id: 5,
    nombre: "medias",
    precio: 8499,
    
},
{
    id: 6,
    nombre: "toallas",
    precio: 6990,

},
{
    id: 7,
    nombre: "zapatillas",
    precio: 1399,
   
},
{
    id: 8,
    nombre: "bufandas",
    precio: 8599,
    
},
]

const carritoProductos = document.querySelector("#productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantidad = document.querySelector("#cantidad-productos");

cargarProductos(productos);

/***** FUNCIONES *****/
function cargarProductos(productos) {

carritoProductos.innerHTML = "";

productos.forEach(producto => {

    const item = document.createElement("div");
    item.classList.add("item-carrito");
    item.innerHTML += `
        <img src="${producto.img}" alt="${producto.nombre}">
        <div class="descripcion">
        <p><b>${producto.nombre}</b></p>
        <p>$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">AGREGAR</button>
        </div>`;

    carritoProductos.append(item);

});

actualizarBotonesAgregar();

}

let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productos-carrito");

if (productosEnCarritoLS) {
productosEnCarrito = JSON.parse(productosEnCarritoLS);
actualizarCantidad();
} else {
productosEnCarrito = [];
}

function agregarProductoCarrito(e) {

const idBoton = e.currentTarget.id;
const productoAgregar = productos.find(producto => producto.id == idBoton);

if (productosEnCarrito.some(producto => producto.id == idBoton)) {
    const indexProducto = productosEnCarrito.findIndex(producto => producto.id == idBoton);
    productosEnCarrito[indexProducto].cantidad += 1;
} else {
    productoAgregar.cantidad = 1;
    productosEnCarrito.push(productoAgregar);
}

actualizarCantidad();

localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCantidad() {
let num = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
cantidad.innerText = num;
}

function actualizarBotonesAgregar() {

botonesAgregar = document.querySelectorAll(".producto-agregar");

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarProductoCarrito);
});

}