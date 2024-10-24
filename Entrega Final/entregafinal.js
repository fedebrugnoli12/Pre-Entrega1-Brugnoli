// Lista de productos como un array de objetos
let carritoVisible = false;

// Esperamos que todos los elementos de la página carguen
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    agregarEventosACarrito();
    cargarProductos();
    mostrarBienvenida();
}

// Agrego funcionalidad a los botones del carrito
function agregarEventosACarrito() {
    // Agrego funcionalidad a los botones "Agregar al carrito"
    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    Array.from(botonesAgregarAlCarrito).forEach(button => {
        button.addEventListener('click', agregarAlCarritoClicked);
    });

    // Agrego funcionalidad a los botones de eliminar del carrito
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    Array.from(botonesEliminarItem).forEach(button => {
        button.addEventListener('click', eliminarItemCarrito);
    });

    // Funcionalidad del botón "Pagar"
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

// Función para cargar productos desde un archivo JSON
function cargarProductos() {
    fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            return response.json();
        })
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error(error);
        });
}

// Mostrar productos en el contenedor
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementsByClassName('contenedor-items')[0];
    productos.forEach(producto => {
        const itemHTML = `
            <div class="item">
                <img src="${producto.imagenSrc}" class="img-item" alt="${producto.titulo}">
                <div class="titulo-item">${producto.titulo}</div>
                <div class="precio-item">$${producto.precio.toLocaleString('es-AR')}</div>
                <button class="boton-item">Agregar al carrito</button>
            </div>
        `;
        contenedorProductos.innerHTML += itemHTML;
    });

    agregarEventosACarrito();
}

// Función al agregar un artículo al carrito
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    const precio = item.getElementsByClassName('precio-item')[0].innerText;
    const imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

// Función para hacer visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    const carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    const items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

// Agregar un artículo al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Verifico que el ítem no esté ya en el carrito
    const nombresItemsCarrito = Array.from(itemsCarrito.getElementsByClassName('carrito-item-titulo'));
    const itemExistente = nombresItemsCarrito.find(item => item.innerText === titulo);
    if (itemExistente) {
        alert("El ítem ya está en el carrito");
        return;
    }

    const itemCarrito = crearItemCarrito(titulo, precio, imagenSrc);
    itemsCarrito.append(itemCarrito);
    actualizarTotalCarrito();
}

// Crear un elemento del carrito
function crearItemCarrito(titulo, precio, imagenSrc) {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
        <img src="${imagenSrc}" width="80px" alt="">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar"><i class="fa-solid fa-trash"></i></span>
    `;

    // Añadir funcionalidad de eliminar
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    // Añadir funcionalidad a los botones de sumar/restar cantidad
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    return item;
}

// Función para sumar cantidad
function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    const cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual + 1;
    actualizarTotalCarrito();
}

// Función para restar cantidad
function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    const cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    if (cantidadActual > 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual - 1;
        actualizarTotalCarrito();
    }
}

// Función para eliminar un ítem del carrito
function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    const itemCarrito = buttonClicked.closest('.carrito-item');
    itemCarrito.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Función para ocultar el carrito
function ocultarCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.children.length === 0) {
        carritoVisible = false;
        const carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';

        const items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '70%';
    }
}

// Función al hacer clic en "Pagar"
function pagarClicked() {
    alert("Gracias por tu compra");
    guardarProductosComprados(); // Guardar productos en localStorage
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    let total = 0;

    // Recorro los ítems del carrito para calcular el total
    const carritoItemsList = Array.from(carritoItems.getElementsByClassName('carrito-item'));
    carritoItemsList.forEach(item => {
        const precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        const precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', '').replace(',', ''));
        const cantidadElemento = item.getElementsByClassName('carrito-item-cantidad')[0];
        const cantidad = parseInt(cantidadElemento.value);
        total += precio * cantidad;
    });

    // Redondeamos a dos decimales y mostramos el total
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Función para guardar productos comprados en localStorage
function guardarProductosComprados() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    const productosComprados = [];

    // Recorro los ítems del carrito para obtener los productos
    Array.from(carritoItems.getElementsByClassName('carrito-item')).forEach(item => {
        const titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
        const precio = item.getElementsByClassName('carrito-item-precio')[0].innerText;
        const cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        const imagenSrc = item.getElementsByTagName('img')[0].src;

        // Guardo los detalles del producto en un objeto
        productosComprados.push({
            titulo: titulo,
            precio: precio,
            cantidad: cantidad,
            imagenSrc: imagenSrc
        });
    });

    // Guardo el array de productos en localStorage
    localStorage.setItem("productos_comprados", JSON.stringify(productosComprados));
}


/* LIBRERIA TOASTIFY*/
console.log('Mostrando Toast');
Toastify({
    text: "Bienvenido a la tienda de Mates Uruguayos",
    duration: 10000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // top or bottom
    position: "right", // left, center or right
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, black, blue)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

