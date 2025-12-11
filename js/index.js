
// Devuelve el carrito almacenado o uno vacío
function obtenerCarrito() {
    var guardado = localStorage.getItem("carrito");
    if (guardado) {
        return JSON.parse(guardado);
    } else {
        return [];
    }
}

// Guarda el carrito actualizado
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    var carrito = obtenerCarrito();
    document.getElementById("contador").textContent = carrito.length;
}
function filtrarPorCategoria(categoria) {
    var productos = document.querySelectorAll(".tarjeta-producto");
    var titulo = document.querySelector(".seccion-productos h2");

    // Cambiar título
    if (categoria === "Todos") {
        titulo.textContent = "Ofertas Destacadas";
    } else {
        titulo.textContent = categoria;
    }

    // Ocultar o mostrar productos
    for (var i = 0; i < productos.length; i++) {
        var categoriaProducto = productos[i].getAttribute("data-categoria");

        if (categoria === "Todos" || categoria === categoriaProducto) {
            productos[i].style.display = "block";
        } else {
            productos[i].style.display = "none";
        }
    }

    // Actualizar el select
    document.getElementById("filtro-categoria").value = categoria;
}

function configurarBotonesAgregar() {
    var botones = document.querySelectorAll(".boton-agregar");

    for (var i = 0; i < botones.length; i++) {
        botones[i].onclick = function () {

            // Info del producto desde su tarjeta
            var tarjeta = this.parentElement;

            var producto = {
                nombre: tarjeta.getAttribute("data-nombre"),
                precio: tarjeta.getAttribute("data-precio"),
                categoria: tarjeta.getAttribute("data-categoria"),
                imagen: tarjeta.getAttribute("data-imagen")
            };

            // Guardar en carrito
            var carrito = obtenerCarrito();
            carrito.push(producto);
            guardarCarrito(carrito);

            // Actualizar número del carrito
            actualizarContador();

            var boton = this;
            boton.textContent = "Agregado ✓";
            boton.style.background = "#16c44f";

            setTimeout(function () {
                boton.textContent = "Agregar al carrito";
                boton.style.background = "#27ae60";
            }, 1200);
        };
    }
}

function configurarFiltros() {
    var menu = document.querySelectorAll("[data-filtro]");

    for (var i = 0; i < menu.length; i++) {
        menu[i].onclick = function () {
            var categoria = this.getAttribute("data-filtro");

            // Cerrar menú móvil (si estuviera abierto)
            var menuCheck = document.getElementById("menu-toggle");
            if (menuCheck) menuCheck.checked = false;

            // Filtrar después de 100ms para permitir el scroll
            setTimeout(function () {
                filtrarPorCategoria(categoria);
            }, 100);
        };
    }


    document.getElementById("filtro-categoria").onchange = function () {
        filtrarPorCategoria(this.value);
    };
}

actualizarContador();
configurarBotonesAgregar();
configurarFiltros();
