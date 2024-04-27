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
    } else if (usuario === "admin1" && contraseña === "123123") {
        sessionStorage.setItem("loggedInUser", "admin1");
        window.location.href = "/Index.html";
        return false;
    } else if (usuario === "matias" && contraseña === "123123") {
        sessionStorage.setItem("loggedInUser", "matias");
        window.location.href = "/Index.html";
        return false;
    } else {
        document.getElementById("resultado").innerHTML = "Usuario o contraseña incorrectos";
        return false;
    }
}

// Mostrar las sesiones
document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    
    if (loggedInUser === "admin1") {
        document.querySelectorAll(".adminBtn").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".indexbtn").forEach(btn => btn.style.display = "none");
    } else if (loggedInUser === "matias") {
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
    sessionStorage.removeItem("loggedInUser");
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

document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.querySelector(".inputbuscar");
    const resultList = document.getElementById("resultsList");
    const noResults = document.getElementById("noResults");

    let musicLibrary = [];

    try {
        const response = await fetch("/json/biblioteca.json");
        if (response.ok) {
            musicLibrary = await response.json();
        } else {
            console.error("Error al cargar el archivo JSON.");
        }
    } catch (error) {
        console.error("Error al hacer la solicitud del archivo JSON:", error);
    }

    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredResults = musicLibrary.filter(item => 
            item.artista.toLowerCase().includes(searchTerm) ||
            item.nombre.toLowerCase().includes(searchTerm)
        );

        resultList.innerHTML = "";

        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.artista} - ${item.nombre}`;
                li.classList.add("selectable-result");
                li.addEventListener("click", () => {
                    if (item.artista.toLowerCase() === "marshmello" && 
                        item.nombre.toLowerCase() === "alone") {
                        window.location.href = "../Pages/detalle-cancion.html";
                    } else {
                        window.location.href = "../Pages/Error-404.html";
                    }
                });
                resultList.appendChild(li);
            });
            noResults.style.display = "none";
        } else {
            noResults.style.display = "block";
        }

        if (searchInput.value === "") {
            resultList.innerHTML = "";
        }
    };

    searchInput.addEventListener("input", handleSearch);
});

