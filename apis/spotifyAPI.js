// cambiar apiKey o solicitar un token para que funcione sino no funciona la API

const apiKey = 'BQDlD7Y0aD3LDYKtWsGUwR4t7maZnYL7V4lhUQGuI6CFv1N_aRfq2drjdHzItU91JxQ5dG-GoL4aevSaXoPEJsNSje6LwBbXpKLUyU93tJtCwb4H-bWAIx_9vn1bLAai5TrhLH15tUNURw58OV-kdI1bVdWMS5JHZ-1e4ki57e2rZVnRPjRPF0JZ4HjrzGzVeuOUJBNtkI2hrgeWKB1ebGsE3e84fZnTIZ64LY42HhbkQ3nex9lwazKNXIASe2HDyQ';

const audioPlayer = new Audio();
audioPlayer.volume = 0.1;

async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks() {
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=long_term&limit=10', 'GET'
    )).items;
}

// Agrega un evento de clic al enlace "Lista de reproducción"
document.getElementById("cargarEstudiar").addEventListener("click", function() {
    cargarListaReproduccion();
});

// Función para cargar la lista de reproducción
async function cargarListaReproduccion() {
    await updatePlaylist();
}

// Función para actualizar la lista de reproducción
async function updatePlaylist() {
    const topTracks = await getTopTracks();
    const playlistElement = document.getElementById('lista-music');
    playlistElement.innerHTML = '';
    for (let i = topTracks.length - 1; i >= 0; i--) {
        const track = topTracks[i];
        const trackName = track.name;
        const artistNames = track.artists.map(artist => artist.name).join(', ');

        const listItem = document.createElement('li');
        listItem.classList.add('music');
        listItem.innerHTML = `
        <a href="#" class="btn play-music"><i class="far fa-play-circle"></i></a>
        <h3>${artistNames}</h3>
        <h3 class="time">-</h3>
        <h3 class="name">${trackName}</h3>`;

        listItem.querySelector('.btn.play-music').addEventListener('click', () => {
            const audioUrl = track.preview_url;
            playMusic(audioUrl);
            updateActiveButton(listItem);
        });

        playlistElement.appendChild(listItem);
    }
}

function playMusic(url) {
    if (audioPlayer.src !== url) {

        audioPlayer.src = url;
        audioPlayer.volume = 0.1;
        audioPlayer.play();
    } else {
        if (audioPlayer.paused) {
            audioPlayer.volume = 0.1;
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }
}


const volumeInterval = setInterval(() => {
    if (audioPlayer.volume < 0.1) {
        audioPlayer.volume += 0.03;
    } else {
        clearInterval(volumeInterval);
    }
}, 1000);


function updateActiveButton(clickedItem) {
    const allPlayButtons = document.querySelectorAll('.btn.play-music');
    allPlayButtons.forEach(button => {
        button.classList.remove('reaccion-activa-reproducida');
    });
    clickedItem.querySelector('.btn.play-music').classList.add('reaccion-activa-reproducida');
}


document.querySelector('.btn.control.atras').addEventListener('click', () => {
    
    audioPlayer.currentTime -= 10;
});

document.querySelector('.btn.control.play-musica').addEventListener('click', () => {

    playMusic(audioPlayer.src);
});

document.querySelector('.btn.control.pausa').addEventListener('click', () => {

    if (!audioPlayer.paused) {
        audioPlayer.pause();
    }
});

document.querySelector('.btn.control.siguiente').addEventListener('click', () => {
    
    audioPlayer.currentTime += 10; 
});



