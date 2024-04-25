// validacion del formulario
function validacion() {
    let expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let soloLetras = /^[a-zA-Z\s]*$/;

    if (document.Formu.Usuario.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa un Usuario*";
        return false;
    } else if (document.Formu.Usuario.value.length < 6) {
        document.getElementById("resultado").innerHTML = "Mínimo 6 caracteres*";
        return false;
    } else if (document.Formu.Email.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa un Mail*";
        return false;
    } else if (!expresionCorreo.test(document.Formu.Email.value)) {
        document.getElementById("resultado").innerHTML = "Correo electrónico inválido*";
        return false;
    } else if (document.Formu.Contraseña.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa una Contraseña*";
        return false;
    } else if (document.Formu.Contraseña.value.length < 6) {
        document.getElementById("resultado").innerHTML = "Contraseña de 6 caracteres*";
        return false;
    } else if (document.Formu.Rcontraseña.value == "") {
        document.getElementById("resultado").innerHTML = "Repite la Contraseña*";
        return false;
    } else if (document.Formu.Rcontraseña.value !== document.Formu.Contraseña.value) {
        document.getElementById("resultado").innerHTML = "Las Contraseñas no Coinciden*";
        return false;
    } else if (document.Formu.Nombre.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa tu Nombre*";
        return false;
    } else if (!soloLetras.test(document.Formu.Nombre.value)) {
        document.getElementById("resultado").innerHTML = "Ingresa solo letras en el Nombre*";
        return false;
    } else if (document.Formu.Apellido.value == "") {
        document.getElementById("resultado").innerHTML = "Ingresa tu Apellido*";
        return false;
    } else if (!soloLetras.test(document.Formu.Apellido.value)) {
        document.getElementById("resultado").innerHTML = "Ingresa solo letras en el Apellido*";
        return false;
    } else if (!document.getElementById('aceptoTerminos').checked) {
        document.getElementById("resultado").innerHTML = "Debes aceptar los términos y condiciones*";
        return false;
    } else if (document.Formu.Contraseña.value == document.Formu.Rcontraseña.value) {
        mensaje.classList.add("abrir-mensaje");
        enviarMail();
        return false;
    } else {
        return true;
    }
}

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
    