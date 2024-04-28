// Global variable to hold the list of songs
let songs = [];

// Load songs from localStorage or from JSON file
function loadSongs() {
    const savedSongs = localStorage.getItem('songs');
    if (savedSongs) {
        songs = JSON.parse(savedSongs);
    } else {
        $.getJSON('../json/lista.json', function (data) {
            songs = data;
            saveSongs();
        });
    }
}

// Save songs to localStorage
function saveSongs() {
    localStorage.setItem('songs', JSON.stringify(songs));
}

// Render songs in the table
function renderSongs() {
    const songTableBody = document.getElementById('songTableBody');
    songTableBody.innerHTML = ''; // Clear the existing content

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
                <button class="btn btn-danger btn-sm delete-song-button" data-index="${index}">Borrar</button>
            </td>
        `;
        songTableBody.appendChild(row);
    });
}

// Add event listeners
function addEventListeners() {
    document.getElementById('saveSongButton').addEventListener('click', addSong);
    document.getElementById('editSaveSongButton').addEventListener('click', saveEditSong);

    // Attach event listeners to dynamically created elements
    $(document).on('click', '.edit-song-button', function () {
        const index = $(this).data('index');
        const song = songs[index];

        // Fill the edit form with current data
        document.getElementById('editArtistName').value = song.artist;
        document.getElementById('editSongName').value = song.name;
        document.getElementById('editCategory').value = song.category;
        document.getElementById('editDuration').value = song.duration;
        document.getElementById('editImageUrl').value = song.imageUrl;
        document.getElementById('editPublished').checked = song.published;

        // Store index in modal data for later use
        $('#editSongModal').data('index', index);
    });

    $(document).on('click', '.delete-song-button', function () {
        const index = $(this).data('index');
        if (confirm('¿Estás seguro de que quieres borrar esta canción?')) {
            songs.splice(index, 1);
            saveSongs();
            renderSongs();
        }
    });
}

// Add a new song
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

    saveSongs();
    renderSongs();
    $('#addSongModal').modal('hide');
}

// Save changes after editing a song
function saveEditSong() {
    const index = $('#editSongModal').data('index');
    const artistName = document.getElementById('editArtistName').value;
    const songName = document.getElementById('editSongName').value;
    const category = document.getElementById('editCategory').value;
    const duration = document.getElementById('editDuration').value;
    const imageUrl = document.getElementById('editImageUrl').value;
    const published = document.getElementById('editPublished').checked;

    songs[index].artist = artistName;
    songs[index].name = songName;
    songs[index].category = category;
    songs[index].duration = duration;
    songs[index].imageUrl = imageUrl;
    songs[index].published = published;

    saveSongs();
    renderSongs();
    $('#editSongModal').modal('hide');
}

// Initialize the application
function initialize() {
    loadSongs();
    renderSongs();
    addEventListeners();
}

// Call initialize on page load
document.addEventListener('DOMContentLoaded', initialize);
