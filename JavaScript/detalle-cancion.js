const stars = document.querySelectorAll(".estrella");

// Evento clic para cada estrella
stars.forEach(function (star, index) {
  star.addEventListener("click", function () {
    // obtener la calificación actual
    const rating = index + 1;

    // Almacenar la calificación en local storage
    localStorage.setItem("rating", rating);

    // Actualizar pantalla
    updateStarRating(rating);
  });
});

// Función para actualizar pantalla
function updateStarRating(rating) {
  // Recorrer todas las estrellas y eliminar checked
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("checked");
  }

  // Agregar checked a las estrellas
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add("checked");
  }
}

// Obtener la calificación almacenada en local storage
const storedRating = localStorage.getItem("rating");

// Si hay una calificación almacenada, actualizar la interfaz de usuario
if (storedRating) {
  updateStarRating(storedRating);
}

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

function validacion() {
    var usuario = document.Formu.Usuario.value;
    var contraseña = document.Formu.Contraseña.value;

    if (document.Formu.Usuario.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa un Usuario*";
        return false;        
    }else if (document.Formu.Usuario.value.length < 6) {
        document.getElementById("resultado").innerHTML = "Mínimo 6 caracteres*";
        return false;
    }else if (document.Formu.Contraseña.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa una Contraseña*";
        return false;
    } else if (document.Formu.Contraseña.value.length < 6) {
        document.getElementById("resultado").innerHTML = "Contraseña de 6 caracteres*";
        return false;
    } else if (usuario === "admin1" && contraseña === "123123") {
        window.location.href = "../Pages/pag-adm.html";
        return false;
    } else if (usuario === "matias" && contraseña === "123123") {
        window.location.href = "../Pages/adm-usu.html";
        return false;
    } else {
        document.getElementById("resultado").innerHTML = "Usuario o contraseña incorrectos";
        return false;
    }
    
}

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
