let usuario = prompt("Ingrese su nombre");

while ((usuario === "") || (!isNaN(usuario))) {
    alert("Valor incorrecto");
    usuario = prompt("Ingrese su nombre");
}

const saludar = (usuario) => {alert("Bienvenido/a " + usuario + " a nuestro sitio web!")}

let cuantasUnidades = parseInt(prompt("¿Cuántas unidades desea comprar?"));

while ((cuantasUnidades === "") || (isNaN(cuantasUnidades))) {
    alert("Por favor ingrese un número");
    cuantasUnidades = parseInt(prompt("¿Cuántas unidades desea comprar?"));
}

if (cuantasUnidades >= 6) {
    alert("¿Desea comprar en gran cantidad?  Visite nuestra sección Venta Corporativa");
    saludar(usuario);
    } else {
        saludar(usuario);
        }

if ((cuantasUnidades >= 6)  && (cuantasUnidades <= 10)) {
    console.log("Por este volúmen de compra obtiene un 5% de descuento");
} else if ((cuantasUnidades >= 11) && (cuantasUnidades <= 20)) {
    console.log("Por este volúmen de compra obtiene un 10% de descuento");
} else if ((cuantasUnidades >= 21)) {
    console.log("Por este volúmen de compra obtiene un 15% de descuento");
} else {
    console.log("Por este volúmen de compra no hay descuentos");
}