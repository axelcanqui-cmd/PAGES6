
function obtenerCarrito() {
    var carritoGuardado = localStorage.getItem('carrito');
    
    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    } else {
        return [];
    }
}

function agregarAlCarrito(producto) {
    var carrito = obtenerCarrito();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarDelCarrito(posicion) {
    var carrito = obtenerCarrito();
    carrito.splice(posicion, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarProductosEnCarrito() {
    var carrito = obtenerCarrito();
    var contenedorLista = document.getElementById('lista-carrito');
    
    // carrito  vacío
    if (carrito.length === 0) {
        contenedorLista.innerHTML = '<p style="text-align:center; padding:40px; color:#999;">Tu carrito está vacío</p>';
        document.getElementById('subtotal').textContent = '0 BOB';
        document.getElementById('total').textContent = '0 BOB';
        return;
    }
    
  a
    contenedorLista.innerHTML = '';
    
    // total
    var totalPrecio = 0;
    

    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var precioNumero = parseInt(producto.precio);
        totalPrecio = totalPrecio + precioNumero;
        o
        var elementoProducto = document.createElement('article');
        elementoProducto.className = 'producto-carrito';
        elementoProducto.setAttribute('data-indice', i);
        
        
        elementoProducto.innerHTML = 
            '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" class="foto-producto">' +
            '<div class="detalle-producto">' +
                '<h3>' + producto.nombre + '</h3>' +
                '<p class="texto-info">' + producto.categoria + '<br>1 unidad</p>' +
            '</div>' +
            '<div class="precio-producto">' + producto.precio + ' BOB</div>' +
            '<button class="boton-borrar">Eliminar</button>';
        
        // Agregar el producto a la lista
        contenedorLista.appendChild(elementoProducto);
    }
    
    //Actualizartotal
    document.getElementById('subtotal').textContent = totalPrecio + ' BOB';
    document.getElementById('total').textContent = totalPrecio + ' BOB';
    

    configurarBotonesEliminar();
}

function configurarBotonesEliminar() {
    var botonesEliminar = document.querySelectorAll('.boton-borrar');
    
    for (var i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].onclick = function() {
            var elementoProducto = this.parentElement;
            var posicion = elementoProducto.getAttribute('data-indice');
            
            elementoProducto.style.opacity = '0';
            elementoProducto.style.transform = 'translateX(-50px)';
            
            setTimeout(function() {
                eliminarDelCarrito(posicion);
                mostrarProductosEnCarrito();
            }, 300);
        };
    }
}



function configurarCarrusel() {
    var carrusel = document.getElementById('carrusel');
    var botonIzquierda = document.getElementById('flecha-izq');
    var botonDerecha = document.getElementById('flecha-der');
    
    
    botonDerecha.onclick = function() {
        carrusel.scrollLeft = carrusel.scrollLeft + 240;
    };
    
   
    botonIzquierda.onclick = function() {
        carrusel.scrollLeft = carrusel.scrollLeft - 240;
    };
}


function configurarProductosSugeridos() {
    var botonesSugeridos = document.querySelectorAll('.boton-agregar-sugerido');
    
    for (var i = 0; i < botonesSugeridos.length; i++) {
        botonesSugeridos[i].onclick = function() {
            
            var elementoProducto = this.parentElement;
            
            
            var nombre = elementoProducto.getAttribute('data-nombre');
            var precio = elementoProducto.getAttribute('data-precio');
            var categoria = elementoProducto.getAttribute('data-categoria');
            var imagen = elementoProducto.getAttribute('data-imagen');
            
            
            var producto = {
                nombre: nombre,
                precio: precio,
                categoria: categoria,
                imagen: imagen
            };
            
            // Agregar al carrito
            agregarAlCarrito(producto);
            
            // Recargar la lista del carrito
            mostrarProductosEnCarrito();
            
            // Cambiar el botón temporalmente
            this.textContent = '✓';
            this.style.background = '#1abc9c';
            
            var botonActual = this;
            setTimeout(function() {
                botonActual.textContent = '+';
                botonActual.style.background = '#27ae60';
            }, 1000);
        };
    }
}

function configurarMenuMovil() {
    var enlacesMenu = document.querySelectorAll('.menu-movil a');
    var checkboxMenu = document.getElementById('menu-toggle');
    
    for (var i = 0; i < enlacesMenu.length; i++) {
        enlacesMenu[i].onclick = function() {
            checkboxMenu.checked = false;
        };
    }
}

window.onload = function() {
    mostrarProductosEnCarrito();
    configurarCarrusel();
    configurarProductosSugeridos();
    configurarMenuMovil();
};