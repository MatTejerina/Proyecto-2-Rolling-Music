// Cambiar el nombre de la clave para localStorage
const SONGS_KEY = 'canciones';

// Cargar canciones desde localStorage o desde el archivo JSON
function loadSongs() {
    const savedSongs = localStorage.getItem(SONGS_KEY);
    if (savedSongs) {
        songs = JSON.parse(savedSongs);
    } else {
        $.getJSON('../json/biblioteca.json', function (data) {
            songs = data;
            saveSongs(); // Guardar las canciones en localStorage
        });
    }
}

// Guardar canciones en localStorage
function saveSongs() {
    localStorage.setItem(SONGS_KEY, JSON.stringify(songs));
}

// Renderizar las canciones en la tabla
function renderSongs() {
    const songTableBody = document.getElementById('songTableBody');
    songTableBody.innerHTML = ''; // Limpiar el contenido existente

    songs.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${song.artist}</td>
            <td>${song.name}</td>
            <td>${song.category}</td>
            <td>${song.duration}</td>
            <td><img src="${song.imageUrl}" alt="${song.name}" style="width: 50px;"></td>
            <td>${song.published ? 'Sí' : 'No'}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-song-button" data-index="${index}" data-toggle="modal" data-target="#editSongModal">Editar</button>
                <button class="btn btn-danger btn-sm delete-song-button mt-1" data-index="${index}">Borrar</button>
            </td>
        `;
        songTableBody.appendChild(row);
    });
}

// Escuchar eventos para los botones de agregar y editar canciones
function addEventListeners() {
    document.getElementById('saveSongButton').addEventListener('click', addSong);
    document.getElementById('editSaveSongButton').addEventListener('click', saveEditSong);

    // Asociar eventos a elementos dinámicos
    $(document).on('click', '.edit-song-button', function () {
        const index = $(this).data('index');
        const song = songs[index];

        // Llenar el formulario de edición con datos actuales
        document.getElementById('editArtistName').value = song.artist;
        document.getElementById('editSongName').value = song.name;
        document.getElementById('editCategory').value = song.category;
        document.getElementById('editDuration').value = song.duration;
        document.getElementById('editImageUrl').value = song.imageUrl;
        document.getElementById('editPublished').checked = song.published;

        // Almacenar índice en el modal para su uso posterior
        $('#editSongModal').data('index', index);
    });

    $(document).on('click', '.delete-song-button', function () {
        const index = $(this).data('index');
        const songToDelete = songs[index]; // Obtenemos la canción a eliminar
    
        // Preguntar al usuario si realmente quiere eliminar la canción
        if (confirm('¿Estás seguro de que quieres borrar esta canción?')) {
            // Realizamos la llamada `fetch` para eliminar la canción de la base de datos (si es necesario)
            fetch(`https://json-server-render-r0gl.onrender.com/usuarios/${songToDelete.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Eliminar la canción de la lista local
                    songs.splice(index, 1);
                    saveSongs();
                    renderSongs();
    
                    alert("Canción eliminada con éxito.");
                } else {
                    alert("Error al eliminar la canción. Por favor, inténtelo nuevamente.");
                }
            })
            .catch(error => {
                console.error("Error al eliminar la canción:", error);
                alert("Se produjo un error al intentar eliminar la canción. Por favor, inténtelo más tarde.");
            });
        }
    });
}

// Agregar una nueva canción
function addSong() {
    const artistName = document.getElementById('artistName').value;
    const songName = document.getElementById('songName').value;
    const category = document.getElementById('category').value;
    const duration = document.getElementById('duration').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const published = document.getElementById('published').checked;

    songs.push({
        artist: artistName,
        name: songName,
        category: category,
        duration: duration,
        imageUrl: imageUrl,
        published: published,
    });

    saveSongs(); // Guardar la nueva canción
    renderSongs(); // Actualizar la tabla
    $('#addSongModal').modal('hide'); // Cerrar el modal de agregar
}

// Guardar cambios después de editar una canción
function saveEditSong() {
    const index = $('#editSongModal').data('index');
    const artistName = document.getElementId('editArtistName').value;
    const songName = document.getElementId('editSongName').value;
    const category = document.getElementId('editCategory').value;
    const duration = document.getElementId('editDuration').value;
    const imageUrl = document.getElementId('editImageUrl').value;
    const published = document.getElementId('editPublished').checked;

    songs[index].artist = artistName;
    songs[index].name = songName;
    songs[index].category = category;
    songs[index].duration = duration;
    songs[index].imageUrl = imageUrl;
    songs[index].published = published;

    saveSongs(); // Guardar cambios
    renderSongs(); // Actualizar la tabla
    $('#editSongModal').modal('hide'); // Cerrar el modal de edición
}

// Inicializar la aplicación
function initialize() {
    loadSongs(); // Cargar canciones
    renderSongs(); // Renderizar canciones
    addEventListeners(); // Agregar oyentes de eventos
}

// Llamar a la función de inicialización cuando se cargue la página
document.addEventListener('DOMContentLoaded', initialize);

