let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    alert(nombre + " agregado al carrito");
    actualizarCarrito();
}

function actualizarCarrito() {
    let lista = document.getElementById("lista-carrito");
    let total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach(producto => {
        let li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        lista.appendChild(li);
        suma += producto.precio;
    });

    total.textContent = "$" + suma;
}

document.getElementById("form-asesoria").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("mensaje-exito").style.display = "block";
    this.reset();
});
