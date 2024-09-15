// Objeto que representa la tienda
const tienda = {
    // Array de productos disponibles en la tienda
    productos: [
        { nombre: "mate", precio: 1200 },
        { nombre: "termo", precio: 1500 }, 
        { nombre: "yerbera", precio: 250 }, 
        { nombre: "bombilla", precio: 750 } 
    ],
    sumaProductos: 0, // Variable para almacenar la suma total de los precios de los productos comprados
    compras: [], // Array para registrar los productos comprados

    // Método para buscar y agregar un producto al carrito de compras
    agregarProducto: function(productoIngresado) {
        // Busca el producto en el array 'productos' que coincide con el nombre ingresado
        const productoEncontrado = this.productos.find(producto => producto.nombre === productoIngresado); 
        if (productoEncontrado) {
            // Muestra una alerta con el nombre y precio del producto encontrado
            alert("El " + productoEncontrado.nombre + " que ofrecemos vale UY$" + productoEncontrado.precio + ".");
            this.sumaProductos += productoEncontrado.precio;  // Suma el precio del producto al total de la compra
            this.compras.push(productoEncontrado); // Agregar el producto al array de compras
        } else {
            alert("Usted no ingresó un producto de nuestra tienda"); 
        }
    },

    // Método para mostrar los productos comprados
    mostrarCompras: function() {
        if (this.compras.length === 0) {
            alert("No ha comprado ningún producto.");
        } else {
            let detalleCompras = "Usted ha comprado:\n";  // Inicializa un string para mostrar los detalles de las compras
            // Recorre el array "compras" y agrega cada producto al detalle
            this.compras.forEach(producto => {
                detalleCompras += "- " + producto.nombre + " por UY$" + producto.precio + "\n";
            });
            alert(detalleCompras);
        }
    },

    mostrarTotal: function() {
        alert("El total de su compra es: UY$" + this.sumaProductos);
    }
};

// Función principal 
function compras() {
    let producto = prompt("Ingrese un producto de nuestra tienda: mate, yerbera, termo, bombilla o escriba EXIT para salir").toLowerCase();
    // Ejecuta el ciclo mientras el usuario no ingrese "exit"
    while (producto !== "exit") {
        // Llama al método "agregarProducto" para procesar el producto ingresado
        tienda.agregarProducto(producto);
        // Solicita al usuario que ingrese otro producto o 'EXIT' para salir
        producto = prompt("Ingrese otro producto o escriba EXIT para salir").toLowerCase();
    }
    // Muestra los productos comprados y el total de la compra
    tienda.mostrarCompras();      // Muestra los productos comprados
    tienda.mostrarTotal();        // Muestra el total de la compra
}

// Llama a la función principal para iniciar el proceso de compras
compras();
