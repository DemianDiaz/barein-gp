let carrito = obtenerDeLs();

const articulos = [
    {nombre: "cinturato1", medida: "175/65R14", precio: 68352, img: "../img/familiacinturato.jpg"},
    {nombre: "cinturato2", medida: "185/65R14", precio: 81548, img: "../img/familiacinturato.jpg"},
    {nombre: "pzero1", medida: "255/35R18", precio: 300259, img: "../img/familiapzero.jpg"},
    {nombre: "pzero2", medida: "225/40R18", precio: 201667, img: "../img/familiapzero.jpg"},
    {nombre: "scorpion1", medida: "205/60R16", precio: 153348, img: "../img/familiascorpion.jpg"},
    {nombre: "scorpion2", medida: "215/55R18", precio: 232533, img: "../img/familiascorpion.jpg"},
    {nombre: "chrono1", medida: "205/70R15", precio: 194715, img: "../img/familiachrono.jpg"},
    {nombre: "chrono2", medida: "195/75R16", precio: 169558, img: "../img/familiachrono.jpg"},
]

function mostrarArticulos(articulosFiltrados) {
    const tienda = document.getElementById("tienda");
    tienda.innerHTML = "";
    articulosFiltrados.map(articulo => {
        const divArticulo = document.createElement("div");
            divArticulo.classList.add("card", "m-2");
            divArticulo.style.width = "18rem";
            divArticulo.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${articulo.img}" class="card-img-top" alt="Imagen de ${articulo.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${articulo.nombre}</h5>
                        <p class="card-text">${articulo.medida}</p>
                        <button class="btn btn-primary" onclick="agregarAlCarrito('${articulo.nombre}', ${articulo.precio}, '${articulo.img}')">Agregar al Carrito</button>
                    </div>
                </div>`
            tienda.appendChild(divArticulo);
    });
}

function filtrarArticulos() {
    const textoBusqueda = document.getElementById("buscadorArticulo").value.toLowerCase();
    const articulosFiltrados = articulos.filter((articulo) => articulo.nombre.includes(textoBusqueda));
    if (articulosFiltrados.length > 0) {
        mostrarArticulos(articulosFiltrados);
    } else {
        mostrarMensajeNoResultados();
    }
}

function mostrarMensajeNoResultados() {
    const tienda = document.getElementById("tienda");
    tienda.innerHTML = `<p class="blockquote" style="color: white; text-align: center; font-size: 2rem;">No hay resultados para la búsqueda.</p>`;
}

function agregarAlCarrito(nombre, precio, img) {
    const articuloExistente = carrito.find((articulo) => articulo.nombre === nombre);
    if (articuloExistente) {
        articuloExistente.cantidad++;
    } else {
        carrito.push({nombre, precio, img, cantidad: 1});
    }
    actualizarListaCarrito();
    mostrarCantItems();
    mostrarModal();
    sumarTotal()
    guardarEnLs();
}

function actualizarListaCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    listaCarrito.innerHTML = "";
    carrito.map((articulo, index) => {
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        if (articulo.cantidad === undefined) {
            articulo.cantidad = 1;
        }
        item.innerHTML = 
            `<div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="margin-right: 10px;">
                    <img src="${articulo.img}" alt="Imagen de ${articulo.nombre}" style="max-width: 50px; max-height: 50px;"> - ${articulo.nombre} - $ ${articulo.precio} - <button class="btn btn-primary" onclick="restar(${index})">-</button> ${articulo.cantidad} <button class="btn btn-primary" onclick="sumar(${index})">+</button> - Subtotal $ ${(subtotalItem(articulo))}
                </div>
                <span class="fas fa-trash-alt" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>
            </div>`;
        listaCarrito.appendChild(item);
    });
}

function mostrarModal() {
    const modalElement = document.getElementById('carritoModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();  
}

function cerrarModal() {
    const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
    modal.hide();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarListaCarrito();
    mostrarCantItems();
    sumarTotal();
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
}

function guardarEnLs() {
    const carritoAguardar = JSON.stringify(carrito);
    localStorage.setItem("carritoGuardado", carritoAguardar)
}

function obtenerDeLs() {
    const carritoEnLs = JSON.parse(localStorage.getItem("carritoGuardado")) || [];
    return carritoEnLs;
}

function verificarLs() {
    return !!localStorage.getItem("carritoGuardado");
}

function vaciarCarrito() {
        carrito.splice(0, carrito.length);
        localStorage.clear();
        actualizarListaCarrito();
        mostrarCantItems();
        sumarTotal();
}

function finalizarCompra() {
    let finCompra = document.getElementById('finalizar');
    finCompra.innerHTML = `<p class= "blockquote" style="color: red; text-align: center;">Será dirigido a nuestra página de pagos...</p>`
    vaciarCarrito();
    setTimeout(() => {
        finCompra.innerHTML = '';
    }, 5000);
}

function sumar(index) {
    carrito[index].cantidad++;
    actualizarListaCarrito();
    mostrarCantItems();
    sumarTotal();
}

function restar(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarListaCarrito();
        mostrarCantItems();
        sumarTotal();
    }
}

function subtotalItem(articulo, index) {
    let subtotal = articulo.precio * articulo.cantidad;
    return subtotal
}

function sumarTotal() {
    const subtotales = carrito.map((articulo, index) => subtotalItem(articulo, index));
    const totalCompra = subtotales.reduce((acumulador, subtotal) => acumulador + subtotal, 0);
    let mostrarTotal = document.getElementById('monto-total');
    mostrarTotal.innerHTML = `<p class="blockquote" style="color: red; text-align: center;">Total de su compra: $ ${totalCompra}</p>`;
}

function mostrarIconoCarrito() {
    const iconoCarrito = document.getElementById('lista-menu');
    const contenedorCarrito = document.createElement('div');
    contenedorCarrito.classList.add('carrito-container');
    const i = document.createElement('i');
    i.classList.add('bi', 'bi-cart', 'cart-icon');
    i.onclick = mostrarModal;
    const burbujaCantidad = document.createElement('span');
    burbujaCantidad.classList.add('burbuja-cantidad');
    burbujaCantidad.textContent = '0';
    contenedorCarrito.appendChild(i);
    contenedorCarrito.appendChild(burbujaCantidad);
    iconoCarrito.appendChild(contenedorCarrito);
}

function mostrarCantItems() {
    const burbujaCantidad = document.querySelector('.burbuja-cantidad');
    const cantidadItems = carrito.reduce((acumulador, articulo) => acumulador + articulo.cantidad, 0);
    if (cantidadItems > 0) {
        burbujaCantidad.textContent = cantidadItems;
        burbujaCantidad.style.display = 'block';
    } else {
        burbujaCantidad.style.display = 'none';
    }
}

mostrarIconoCarrito();

document.getElementById("buscadorArticulo").addEventListener("input", filtrarArticulos);

mostrarArticulos(articulos);

document.getElementById('cerrar').addEventListener("click", cerrarModal);