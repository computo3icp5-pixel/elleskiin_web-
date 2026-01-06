let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        lista.appendChild(li);
    });

    totalSpan.textContent = `$${total}`;
}

/* Formulario */
document.getElementById("form-asesoria").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("mensaje-exito").style.display = "block";
    this.reset();
});

