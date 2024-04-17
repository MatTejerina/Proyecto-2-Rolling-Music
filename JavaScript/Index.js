const recuerdame = document.getElementById('recuerdame');
const checkout = document.getElementById('checkout');

recuerdame.addEventListener('click', function(event) {
    event.preventDefault();
    checkout.checked = !checkout.checked;
})

function validacion() {
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
    }
    
}

let mensaje = document.getElementById("mensaje")
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
