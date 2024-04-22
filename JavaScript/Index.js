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

    // Cargar el archivo JSON
    try {
        const response = await fetch("/json/biblioteca.json"); // Ajusta la ruta según sea necesario
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
                li.classList.add("selectable-result"); // Para aplicar estilos
                li.addEventListener("click", () => {
                    if (item.artista.toLowerCase() === "marshmello" && 
                        item.nombre.toLowerCase() === "alone") {
                        window.location.href = "../Pages/registro.html"; // Redirigir a alone.html
                    } else {
                        window.location.href = "../Pages/Error-404.html"; // Redirigir a página predeterminada
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
