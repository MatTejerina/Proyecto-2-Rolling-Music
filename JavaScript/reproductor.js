const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');
const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');
const subirArchivoBtn = document.getElementById('subirArchivo');

// Eventos
btnReaccion.addEventListener('click', likear);
menuMusic.addEventListener('click', cargarInfo);
contenedorListaMusic.addEventListener('click', reproducirMusica);
controles.addEventListener('click', controlar);
subirArchivoBtn.addEventListener('change', subirArchivo);

// Estado para el botón de reacción
let estado = 0;

// Función para manejar el botón de reacción (like)
function likear() {
    btnReaccion.classList.toggle('reaccion-activa');
    estado = 1 - estado;
}

// Función para cargar la información de la lista de reproducción seleccionada
function cargarInfo(e) {
    let jsonurl = '';
    let titlePlay = '';
    let descripcionPlay = '';
    let srcImg = '';

    if (e.target.classList.contains('playLista')) {
        jsonurl = '../json/lista.json';
        titlePlay = ' Tus PlayList';
        descripcionPlay = 'Tu musica para escuchar';
        srcImg = '../img/fondo2.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/fondolista.webp)";
    } else if (e.target.classList.contains('playCumbia')) {
        jsonurl = '../json/Cumbia.json';
        titlePlay = 'Playlist de Cumbia';
        descripcionPlay = 'Música de Cumbia para bailar toda la noche';
        srcImg = '../img/cumbia2.jpg';
        listaReproduccion = 'Cumbia';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/cumbia.webp)";
    } else if (e.target.classList.contains('playElectronica')) {
        jsonurl = '../json/Electronica.json';
        titlePlay = 'Playlist de Electronica';
        descripcionPlay = 'Los mejores temas de Música Electronica';
        srcImg = '../img/electronica2.webp';
        listaReproduccion = 'Electrónica';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/electronica.webp)";
    } else if (e.target.classList.contains('playPop')) {
        jsonurl = '../json/Pop.json';
        titlePlay = 'Playlist de Pop';
        descripcionPlay = 'Disfruta de los éxitos del Pop';
        srcImg = '../img/pop2.webp';
        listaReproduccion = 'Pop';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/pop.webp)";
    } else if (e.target.classList.contains('playReggaeton')) {
        jsonurl = '../json/Reggeton.json';
        titlePlay = 'Playlist de Reggaeton';
        descripcionPlay = 'La mejor música de Reggaeton para bailar';
        srcImg = '../img/reggaeton2.webp';
        listaReproduccion = 'Reggaetón';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/reggaeton.webp)";
    } else if (e.target.classList.contains('playReggea')) {
        jsonurl = '../json/Reggea.json';
        titlePlay = 'Playlist de Reggea';
        descripcionPlay = 'Disfruta de la buena vibra del Reggea';
        srcImg = '../img/reggea2.webp';
        listaReproduccion = 'Reggea';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/reggea.webp)";
    } else if (e.target.classList.contains('playCuarteto')) {
        jsonurl = '../json/Cuarteto.json';
        titlePlay = 'Playlist de Cuarteto';
        descripcionPlay = 'Los clásicos del Cuarteto para bailar y divertirse';
        srcImg = '../img/cuarteto2.webp';
        listaReproduccion = 'Cuarteto';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/cuarteto.webp)";
    } else if (e.target.classList.contains('playRkt')) {
        jsonurl = '../json/Rkt.json';
        titlePlay = 'Playlist de Rkt';
        descripcionPlay = 'Los éxitos de Rkt para disfrutar en cualquier momento';
        srcImg = '../img/rkt2.webp';
        listaReproduccion = 'Rkt';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/rkt.webp)";
    } else if (e.target.classList.contains('playRap')) {
        jsonurl = '../json/Rap.json';
        titlePlay = 'Playlist de Rap';
        descripcionPlay = 'El mejor Rap para escuchar en cualquier momento';
        srcImg = '../img/rap2.webp';
        listaReproduccion = 'Rap';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/rap.webp)";
    } else if (e.target.classList.contains('playRock')) {
        jsonurl = '../json/Rock.json';
        titlePlay = 'Playlist de Rock';
        descripcionPlay = 'La mejor playlist de Rock';
        srcImg = '../img/rock2.webp';
        listaReproduccion = 'Rock';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(../img/rock.webp)";
    } else if (e.target.classList.contains('playBachata')) {
        jsonurl = '../json/Bachata.json';
        titlePlay = 'Playlist de Bachata';
        descripcionPlay = 'La mejor playlist de Bachata';
        srcImg = '../img/Bachata.avif';
        listaReproduccion = 'Bachata';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url('https://elements-video-cover-images-0.imgix.net/files/9abe091d-e6f4-4bc7-b258-73ee7a5e7ce6/inline_image_preview.jpg?auto=compress&h=630&w=1200&fit=crop&crop=edges&fm=jpeg&s=b7f34213ec3967698e370cd52b903265')";
    } else if (e.target.classList.contains('playFolklore')) {
        jsonurl = '../json/Folklore.json';
        titlePlay = 'Playlist de Bachata';
        descripcionPlay = 'La mejor playlist de Folklore';
        srcImg = '../img/folklore.webp';
        listaReproduccion = 'Folklore';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url('https://i.ytimg.com/vi/yaxcMQIgzhw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCYgRSh_MA8=&rs=AOn4CLAWjnqULIQCPtWtbEdL39IKlVmUyA')";
    } 
    titlePlaylist.innerHTML = titlePlay;
    playDescription.innerHTML = descripcionPlay;
    imgAlbum.src = srcImg;
    cargarMusica(jsonurl);
    mostrarListaReproduccion(listaReproduccion);
}
// Función para cargar la lista de música desde un archivo JSON
function cargarMusica(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(music => {
                html += `
                <li class="music">
                    <input type="text" value="${music.url}" style="display: none;">
                    <a href="#" class="btn play-music"><i class="far fa-play-circle"></i></a>
                    <h3>${music.artista}</h3> 
                    <h3 class="time">-</h3>
                    <h3 class="name">${music.nombre}</h3> 
                </li>`;
            });
            contenedorListaMusic.innerHTML = html;
        })
        .catch(error => console.error('Error al cargar la lista de música:', error));
}


function reproducirMusica(e) {
    if (e.target.classList.contains('far', 'fa-play-circle')) {
        let urlM = e.target.parentElement.parentElement.querySelector('input[type="text"]').value;
        controles.innerHTML = `
        <a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
        <audio src="${urlM}" style="width: 50vw;" controls></audio>
        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
        e.target.parentElement.parentElement.classList.add('reaccion-activa-reproducida');
        reproducirCancion(urlM); // Llama a la función para reproducir la canción
    }
}

// Función para controlar la reproducción de la música (siguiente y anterior)
function controlar(e) {
    let audioUrl = e.target.parentElement.querySelector('audio').src;
    let musicArray = Array.from(contenedorListaMusic.children);

    if (e.target.parentElement.classList.contains('siguiente')) {
        let index = musicArray.findIndex(item => item.querySelector('input[type="text"]').value === audioUrl);
        if (index !== -1 && index < musicArray.length - 1) {
            let siguienteMusica = musicArray[index + 1].querySelector('input[type="text"]').value;
            let elementoParaReproducido = musicArray[index + 1].querySelector('.btn.play-music');
            siguienteAtras(siguienteMusica, elementoParaReproducido);
        }
    }

    if (e.target.parentElement.classList.contains('atras')) {
        let index = musicArray.findIndex(item => item.querySelector('input[type="text"]').value === audioUrl);
        if (index > 0) {
            let musicaAtras = musicArray[index - 1].querySelector('input[type="text"]').value;
            let elementoParaReproducido = musicArray[index - 1].querySelector('.btn.play-music');
            siguienteAtras(musicaAtras, elementoParaReproducido);
        }
    }
}

// Función para cargar la siguiente canción automáticamente cuando la actual finaliza
function siguienteAutomatico() {
    let audio = controles.querySelector('audio');
    audio.addEventListener('ended', () => {
        let audioUrl = audio.src;
        let musicArray = Array.from(contenedorListaMusic.children);
        let index = musicArray.findIndex(item => item.querySelector('input[type="text"]').value === audioUrl);
        if (index !== -1 && index < musicArray.length - 1) {
            let siguienteMusica = musicArray[index + 1].querySelector('input[type="text"]').value;
            let elementoParaReproducido = musicArray[index + 1].querySelector('.btn.play-music');
            siguienteAtras(siguienteMusica, elementoParaReproducido);
        }
    });
}

// Función para reproducir la siguiente canción o la anterior
function siguienteAtras(musica, reproducida) {
    controles.innerHTML = `
    <a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${musica}" style="width: 50vw;" controls></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
    reproducida.classList.add('reaccion-activa-reproducida');
    siguienteAutomatico();
}

// Función para manejar la subida de archivos
function subirArchivo(event) {
    const archivos = event.target.files;
    for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const url = e.target.result;
            const nombre = archivo.name;
            // Añadir la canción a la lista de reproducción
            agregarCancion(nombre, url);
        }
        reader.readAsDataURL(archivo);
    }
}

// Función para agregar una canción a la lista de reproducción
function agregarCancion(nombre, url) {
    const nuevaCancion = {
        nombre: nombre,
        url: url
    };
    // Crear el elemento de la lista de reproducción
    const li = document.createElement('li');
    li.classList.add('music');
    li.innerHTML = `
        <input type="text" value="${url}" style="display: none;">
        <a href="#" class="btn play-music"><i class="far fa-play-circle"></i></a>
        <h3>Nombre del artista</h3> 
        <h3 class="name">${nombre}</h3> 
        <h3 class="time">--</h3>`;
    contenedorListaMusic.appendChild(li);
}

// Función para reproducir una canción
function reproducirCancion(url) {
    // Crear un elemento de audio
    const audio = new Audio(url);
    // Agregar controles de reproducción y reproducir automáticamente
    controles.innerHTML = `
    <a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${url}" style="width: 50vw;" controls autoplay></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
}

// Audio



