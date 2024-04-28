function validacion() {
    let expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let soloLetras = /^[a-zA-Z\s]*$/;

    let usuario = document.Formu.Usuario.value;
    let email = document.Formu.Email.value;
    let contraseña = document.Formu.Contraseña.value;
    let rcontraseña = document.Formu.Rcontraseña.value;
    let nombre = document.Formu.Nombre.value;
    let apellido = document.Formu.Apellido.value;
    let aceptoTerminos = document.getElementById('aceptoTerminos').checked;

    // Validaciones de formulario
    if (usuario === "") {
        document.getElementById("resultado").innerHTML = "Ingresa un Usuario*";
        return false;
    } else if (usuario.length < 6) {
        document.getElementById("resultado").innerHTML = "Mínimo 6 caracteres*";
        return false;
    } else if (email === "") {
        document.getElementById("resultado").innerHTML = "Ingresa un Mail*";
        return false;
    } else if (!expresionCorreo.test(email)) {
        document.getElementById("resultado").innerHTML = "Correo electrónico inválido*";
        return false;
    } else if (contraseña === "") {
        document.getElementById("resultado").innerHTML = "Ingresa una Contraseña*";
        return false;
    } else if (contraseña.length < 6) {
        document.getElementById("resultado").innerHTML = "Contraseña de 6 caracteres*";
        return false;
    } else if (rcontraseña === "") {
        document.getElementById("resultado").innerHTML = "Repite la Contraseña*";
        return false;
    } else if (rcontraseña !== contraseña) {
        document.getElementById("resultado").innerHTML = "Las Contraseñas no coinciden*";
        return false;
    } else if (nombre === "") {
        document.getElementById("resultado").innerHTML = "Ingresa tu Nombre*";
        return false;
    } else if (!soloLetras.test(nombre)) {
        document.getElementById("resultado").innerHTML = "Ingresa solo letras en el Nombre*";
        return false;
    } else if (apellido === "") {
        document.getElementById("resultado").innerHTML = "Ingresa tu Apellido*";
        return false;
    } else if (!soloLetras.test(apellido)) {
        document.getElementById("resultado").innerHTML = "Ingresa solo letras en el Apellido*";
        return false;
    } else if (!aceptoTerminos) {
        document.getElementById("resultado").innerHTML = "Debes aceptar los términos y condiciones*";
        return false;
    }

    let loggedInUser = {
        usuario: usuario
    };

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    mensaje.classList.add("abrir-mensaje");
    enviarMail();
    
    return false;
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

// visualizar repite contraseñas
const pass2 = document.getElementById("rpass");
const icon2 = document.querySelector(".rcont");

icon2.addEventListener("click", e=> {
    if (pass2.type === "password") {
        pass2.type = "text";
        icon2.classList.remove("bx-show-alt")
        icon2.classList.add("bx-hide")
    }else {
        pass2.type = "password";
        icon2.classList.add("bx-show-alt")
        icon2.classList.remove("bx-hide")
    }
})

// enviar mail

function enviarMail() {
    const usuario = document.Formu.Usuario.value;
    const email = document.Formu.Email.value;
    const contraseña = document.Formu.Contraseña.value;
    const nombre = document.Formu.Nombre.value;
    const apellido = document.Formu.Apellido.value;

    const cuerpoCorreo = 
        `Usuario: ${usuario}<br>
        Email: ${email}<br>
        Contraseña: ${contraseña}<br>
        Nombre: ${nombre}<br>
        Apellido: ${apellido}<br>`;
   
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "hache.83@gmail.com",
        Password : "9812628575310C1BA59903F37E847C50FFC9",
        To : 'tejerinamatias83@gmail.com',
        From : "hache.83@gmail.com",
        Subject : "Nuevo Usuario" ,
        Body : cuerpoCorreo
    });
}


// Selecciona el elemento que se observará
const targetNode = document.getElementById('mensaje');

// Crea un nuevo observador de mutaciones
const observer = new MutationObserver(function(mutationsList) {
    mutationsList.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            if (targetNode.classList.contains('abrir-mensaje')) {
                form.classList.add('blur');
            } else {
                form.classList.remove('blur');
            }
        }
    });
});

// Configura y comienza a observar el elemento
const config = { attributes: true };
observer.observe(targetNode, config);

