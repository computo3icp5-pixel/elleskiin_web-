let carrito = [];
let total = 0;

// RECUPERAR CARRITO DESDE LOCALSTORAGE AL CARGAR LA PÁGINA
const carritoGuardado = localStorage.getItem("carrito");
const totalGuardado = localStorage.getItem("total");

if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}

if (totalGuardado) {
    total = Number(totalGuardado);
}


function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;

    // GUARDAR EN LOCALSTORAGE
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total);

    actualizarCarrito();
}


function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    carrito.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
        ${item.nombre} - $${item.precio}
        <button class="btn-eliminar" onclick="eliminarProducto(${index})">🗑️</button>

    `;

    lista.appendChild(li);
});

   

    totalSpan.textContent = `$${total}`;

    document.getElementById("contador-carrito").textContent = carrito.length;

}



/* FORMULARIO ASESORÍA */
document.getElementById("form-asesoria").addEventListener("submit", function (e) {
    e.preventDefault();

    const datos = {
        nombre: document.querySelector('[name="nombre"]').value,
        correo: document.querySelector('[name="correo"]').value,
        telefono: document.querySelector('[name="telefono"]').value,
        edad: parseInt(document.querySelector('[name="edad"]').value),
        mensaje: document.querySelector('[name="mensaje"]').value
    };

    fetch("http://127.0.0.1:5000/asesoria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        alert("Asesoría enviada correctamente 💚");
        document.getElementById("form-asesoria").reset();
    })
    .catch(error => {
        alert("Error al enviar la asesoría");
        console.error(error);
    });
});

// MOSTRAR CARRITO GUARDADO AL CARGAR
actualizarCarrito();

function toggleCarrito() {
    document.getElementById("carrito").classList.toggle("oculto");
}

function vaciarCarrito(e) {
    if (e) e.stopPropagation(); // evita cerrar el carrito

    carrito = [];
    total = 0;

    localStorage.removeItem("carrito");
    localStorage.removeItem("total");

    actualizarCarrito();
}

function eliminarProducto(index) {
    const lista = document.getElementById("lista-carrito");
    const itemHTML = lista.children[index];

    itemHTML.classList.add("eliminando");

    setTimeout(() => {
        carrito.splice(index, 1);
        total = carrito.reduce((suma, item) => suma + item.precio, 0);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("total", total);

        actualizarCarrito();
        mostrarMensaje("Producto eliminado 🗑️");
    }, 300);
}

function mostrarMensaje(texto) {
    const mensaje = document.createElement("div");
    mensaje.className = "mensaje-flotante";
    mensaje.textContent = texto;

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

document.addEventListener("click", function (event) {
    const carrito = document.getElementById("carrito");
    const botonCarrito = document.querySelector(".carrito-btn");

    if (!carrito.contains(event.target) && !botonCarrito.contains(event.target)) {
        carrito.classList.add("oculto");
    }
});

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensaje("Tu carrito está vacío 🛒");
        return;
    }

    mostrarMensaje("Gracias por tu compra 💚");

    carrito = [];
    total = 0;

    localStorage.removeItem("carrito");
    localStorage.removeItem("total");

    actualizarCarrito();

    document.getElementById("carrito").classList.add("oculto");
}
