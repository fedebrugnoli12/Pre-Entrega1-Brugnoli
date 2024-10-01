// Clase Producto
class Producto {
    constructor(id, nombre, precio, seleccionado, comprado) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.seleccionado = seleccionado;
        this.comprado = comprado;

        this.divProducto = this.generarHTML();
    }

    generarHTML() {
        const divProducto = document.createElement("div");
        divProducto.className = "producto";
        divProducto.innerHTML = `<h3>${this.nombre}</h3><p>Precio: $${this.precio}</p>`;

        // Si el producto fue comprado
        if (this.comprado) {
            divProducto.className += " comprado";
        }

        divProducto.addEventListener("click", () => {
            this.clickear();
        });

        return divProducto;
    }

    comprar() {
        this.comprado = true;
        this.divProducto.className += " comprado";
    }

    clickear() {
        // Si el producto fue comprado, no se puede seleccionar
        if (this.comprado) {
            alertaError("Este producto ya ha sido comprado.");
            return;
        }

        if (this.seleccionado) {
            // Deseleccionar producto
            this.seleccionado = false;
            productosSeleccionados = productosSeleccionados.filter(el => el.id !== this.id);
            this.divProducto.className = "producto";
        } else {
            // Seleccionar producto
            this.seleccionado = true;
            productosSeleccionados.push(this);
            this.divProducto.className = "producto seleccionado";
        }

        calcularTotales();
    }
}

// Funciones
function alertaError(mensaje) {
    const divAlertaError = document.getElementById("alertaError");
    divAlertaError.innerHTML = `<p>${mensaje}</p>`;
    setTimeout(() => divAlertaError.innerHTML = "", 3000);
}

function alertaBueno(mensaje) {
    const divAlertaBueno = document.getElementById("alertaBueno");
    divAlertaBueno.innerHTML = `<p>${mensaje}</p>`;
    setTimeout(() => divAlertaBueno.innerHTML = "", 3000);
}

function calcularTotales() {
    const total = productosSeleccionados.reduce((sum, producto) => sum + producto.precio, 0);
    const pTotal = document.getElementById("total");
    pTotal.innerHTML = `Total: $${total}`;
}

function guardarProductosComprados() {
    localStorage.setItem("productos_comprados", JSON.stringify(productosComprados));
}

function comprarProductos() {
    if (productosSeleccionados.length === 0) {
        alertaError("No ha seleccionado ningún producto.");
        return;
    }

    productosSeleccionados.forEach(producto => {
        productosComprados.push(producto.id);
        producto.comprar();
    });

    guardarProductosComprados();
    productosSeleccionados = [];
    calcularTotales();
    alertaBueno("¡Productos comprados con éxito!");
}

function renderizarProductos() {
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = "";

    productos.forEach(producto => {
        divProductos.appendChild(producto.divProducto);
    });
}

// Inicio del programa
let productos = [];
let productosSeleccionados = [];
let productosComprados = JSON.parse(localStorage.getItem("productos_comprados")) || [];

const listaProductos = [
    { id: "P1", nombre: "Producto A", precio: 50 },
    { id: "P2", nombre: "Producto B", precio: 75 },
    { id: "P3", nombre: "Producto C", precio: 100 },
    { id: "P4", nombre: "Producto D", precio: 150 },
];

// Crear los objetos Producto
listaProductos.forEach(({ id, nombre, precio }) => {
    const comprado = productosComprados.includes(id);
    const producto = new Producto(id, nombre, precio, false, comprado);
    productos.push(producto);
});

// Renderizar productos
renderizarProductos();

const botonComprar = document.getElementById("comprar");
botonComprar.addEventListener("click", comprarProductos);