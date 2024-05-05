fetch('http://localhost:3000/Users')
.then(response=>response.json())
.then(data => localStorage.setItem('Users', JSON.stringify(data)))

// Validar acceder
function validacion() {
    let usuario = document.Formu.Usuario.value;
    let contraseña = document.Formu.Contraseña.value;

    if (usuario === "") {
        document.getElementById("resultado").innerHTML = "Ingresa un Usuario*";
        return false;        
    } else if (usuario.length < 6) {
        document.getElementById("resultado").innerHTML = "Mínimo 6 caracteres*";
        return false;
    } else if (contraseña === "") {
        document.getElementById("resultado").innerHTML = "Ingresa una Contraseña*";
        return false;
    } else if (contraseña.length < 6) {
        document.getElementById("resultado").innerHTML = "Contraseña de 6 caracteres*";
        return false;
    } 
    const traerUsu = localStorage.getItem('Users');//trae la key
    const usuarios = JSON.parse(traerUsu)|| []; // la parsea
    const usuarioEncontrado = usuarios.find(
        u => u.usuario === usuario && u.contraseña === contraseña
    );

    if (usuarioEncontrado) {
        sessionStorage.setItem("keySession", usuarioEncontrado.admin);

        // Redirigir según el usuario
        if (usuarioEncontrado.admin === true) {
            window.location.href = "/Index.html";
        } else if (usuarioEncontrado.admin === false) {
            window.location.href = "/Index.html";
        }
        return true; // Impedir el envío del formulario
    }
     else {
        document.getElementById("resultado").innerHTML = "Usuario o contraseña incorrectos";
        return false;
    }
}

// Mostrar las sesiones
document.addEventListener("DOMContentLoaded", function() {
    const keySession = sessionStorage.getItem("keySession");

    if (keySession === 'true') {
        document.querySelectorAll(".adminBtn").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".indexbtn").forEach(btn => btn.style.display = "none");
    } else if (keySession === 'false') {
        document.querySelectorAll(".adminBtn").forEach(btn => btn.style.display = "none");
        document.querySelectorAll(".usubtn").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".indexbtn").forEach(btn => btn.style.display = "none");
    } else {
        // Si no hay usuario en sesión, ocultar botones administrativos
        document.querySelectorAll(".adminBtn").forEach(btn => btn.style.display = "none");
    }
});

// cerrar sesion y borrar sessionStore
document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
    sessionStorage.removeItem("keySession");
    window.location.href = "/Index.html";
});

// buscador visible
const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

// Recuerdame
const recuerdame = document.getElementById('recuerdame');
const checkout = document.getElementById('checkout');

recuerdame.addEventListener('click', function(event) {
    event.preventDefault();
    checkout.checked = !checkout.checked;
})

// visualizar contraseñas
const pass = document.getElementById("pass");
const icon = document.querySelector(".cont");

icon.addEventListener("click", e=> {
    if (pass.type === "password") {
        pass.type = "text";
        icon.classList.remove("bx-show-alt")
        icon.classList.add("bx-hide")
    }else {
        pass.type = "password";
        icon.classList.add("bx-show-alt")
        icon.classList.remove("bx-hide")
    }
})
function mostrar() {
    document.getElementById("recuperarContraseña")
    
}

// buscador
// Función para obtener datos de canciones desde el servidor JSON
const getCanciones = async () => {
    try {
      const response = await fetch("/json/dataBi.json"); // Ruta al JSON
      const jsonData = await response.json(); // Obtener datos JSON
      const canciones = jsonData.Canciones || []; // Asegurar que el campo Canciones existe
      return canciones;
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
      return []; // Retornar lista vacía en caso de error
    }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".inputbuscar");
    const resultList = document.getElementById("resultsList");
    const noResults = document.getElementById("noResults");
  
    const handleSearch = async () => {
      const searchTerm = searchInput.value.toLowerCase(); // Término de búsqueda
      const musicLibrary = await getCanciones(); // Obtener la lista de canciones
  
      // Filtrar resultados por coincidencia con el artista o nombre de la canción
      const filteredResults = musicLibrary.filter((item) =>
        item.artist.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm)
      );
  
      resultList.innerHTML = ""; // Limpiar resultados previos
  
      if (filteredResults.length > 0) {
        // Mostrar los resultados filtrados
        filteredResults.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.artist} - ${item.name}`; // Texto del resultado
          li.classList.add("selectable-result");
  
          // Evento de clic para redireccionar según el resultado
          li.addEventListener("click", () => {
            if (item.artist.toLowerCase() === "marshmello" &&
                item.name.toLowerCase() === "alone") {
              window.location.href = "../Pages/detalle-cancion.html"; // Redirección al detalle
            } else {
              window.location.href = "../Pages/Error-404.html"; // Redirección a página de error
            }
          });
  
          resultList.appendChild(li); // Agregar resultado a la lista
        });
        noResults.style.display = "none"; // Ocultar mensaje de "sin resultados"
      } else {
        // Si no hay resultados, mostrar el mensaje de "sin resultados"
        noResults.style.display = "block";
      }
  
      // Limpiar la lista si el término de búsqueda está vacío
      if (searchInput.value.trim() === "") {
        resultList.innerHTML = ""; // Limpiar lista de resultados
        noResults.style.display = "none"; // Ocultar mensaje de "sin resultados"
      }
    };
  
    searchInput.addEventListener("input", handleSearch); // Evento para manejar búsquedas
  });
  