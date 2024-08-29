// Escribir un programa que le pida al usuario ingresar un producto que desee comprar en un carrito de ventas online. 

let producto = prompt("Ingrese un producto que desee compra en la tienda Online de mates uruguayos de lo contrario escriba EXIT. Podemos ofrecerte: mate, bombilla, termo, yerbera");
//Variable para acumular el costo total
let sumaProductos = 0;

function compras(producto){
    while (producto !== "EXIT") {
        if (producto  === "mate") {
            alert("El mate que ofrecemos vale UY$1200");
            sumaProductos +=500;
        }else  if (producto === "termo") {
            alert("El termo que ofrecemos vale UY$1500");
            sumaProductos +=1500;
        } else if (producto == "yerbera") {
            alert("La yerbera que ofrecemos vale UY$250");
            sumaProductos +=250;
        } else if (producto === "bombilla"){
            alert("La bombilla que ofrecemos de alpaca vale UY$750 ")
            sumaProductos +=750;
        }else {
            alert("Usted no ingreso un producto de nuestra tienda")
        }
        producto = prompt("Ingrese otro producto o escriba EXIT para salir");
    }
    alert("El total de su compra es: $" + sumaProductos);
}


compras(producto)

