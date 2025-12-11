function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function mostrarResumenDeCompra() {
    const carrito = obtenerCarrito();
    const lista = document.getElementById("lista-productos");

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío</p>";
        document.getElementById("subtotal").textContent = "0 BOB";
        document.getElementById("total").textContent = "0 BOB";
        return;
    }

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        total += Number(p.precio);

        lista.innerHTML += `
            <div class="producto-item">
                <img class="producto-img" src="${p.imagen}">
                <div class="producto-info">
                    <h4>${p.nombre}</h4>
                    <p>${p.categoria}</p>
                </div>
                <span>${p.precio} BOB</span>
            </div>
        `;
    });

    document.getElementById("subtotal").textContent = total + " BOB";
    document.getElementById("total").textContent = total + " BOB";
}

function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const ciudad = document.getElementById("ciudad").value;
    const departamento = document.getElementById("departamento").value;

    try {
        if (nombre === "" || apellido === "" || email === "" || telefono === "" ||
            direccion === "" || ciudad === "" || departamento === "") {
            throw "Por favor completa todos los campos.";
        }

        if (!isNaN(nombre)) throw "El nombre no puede contener números.";
        if (!isNaN(apellido)) throw "El apellido no puede contener números.";
        if (!isNaN(ciudad)) throw "La ciudad no puede contener números.";

        if (isNaN(telefono)) throw "El teléfono solo debe contener números.";
        if (!email.includes("@")) throw "El email es inválido.";

        return true;

    } catch (error) {
        alert(error);
        return false;
    }
}

function procesarCompra(e) {
    e.preventDefault();

    if (obtenerCarrito().length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    if (!validarFormulario()) return;

    alert("¡Compra realizada con éxito!");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
}

window.onload = function () {
    mostrarResumenDeCompra();
    document.getElementById("formulario-compra").onsubmit = procesarCompra;
};
