// Dirección del servidor JSON
const jsonServerUrl = "/json/dataBi.json";

// Obtener la lista de canciones
const getCanciones = async () => {
  try {
    const response = await fetch(jsonServerUrl);
    const jsonData = await response.json();
    return jsonData.Canciones || [];
  } catch (error) {
    console.error("Error al obtener las canciones:", error);
    return [];
  }
};

// Función para llenar la tabla
const fillSongTable = async () => {
  const canciones = await getCanciones();

  const songTableBody = document.getElementById("songTableBody");
  if (!songTableBody) {
    console.error("Elemento 'songTableBody' no se encontró.");
    return;
  }

  songTableBody.innerHTML = "";

  canciones.forEach((cancion) => {
    const row = createRowForSong(cancion);
    songTableBody.appendChild(row);
  });
};

// Función para crear una fila en la tabla
const createRowForSong = (cancion) => {
  const { id, artist, name, category, duration, imageUrl, published } = cancion;

  const row = document.createElement("tr");

  const cells = [
    id,
    artist,
    name,
    category,
    duration,
    `<img src="${imageUrl}" alt="${name}" width="50" />`,
    published ? "Sí" : "No",
  ];

  cells.forEach((content) => {
    const cell = document.createElement("td");
    cell.className = "text-center";
    cell.innerHTML = content;
    row.appendChild(cell);
  });

  const actionsCell = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.className = "btn btn-warning btn-sm";
  editButton.textContent = "Editar";
  editButton.onclick = () => {
    openEditModal(cancion);
  };

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm";
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = () => {
    deleteSong(id);
  };

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  row.appendChild(actionsCell);

  return row;
};

// Función para abrir el modal de edición
const openEditModal = (cancion) => {
  const modal = document.getElementById("editSongModal");
  if (!modal) {
    console.error("El modal de edición no se encontró.");
    return;
  }

  const editSongId = document.getElementById("editSongId");
  if (!editSongId) {
    console.error("El elemento 'editSongId' no se encontró.");
    return;
  }

  editSongId.value = cancion.id;

  const editArtistName = document.getElementById("editArtistName");
  const editSongName = document.getElementById("editSongName");
  const editCategory = document.getElementById("editCategory");
  const editDuration = document.getElementById("editDuration");
  const editImageUrl = document.getElementById("editImageUrl");
  const editPublished = document.getElementById("editPublished");

  if (editArtistName && editSongName && editCategory && editDuration && editImageUrl) {
    editArtistName.value = cancion.artist;
    editSongName.value = cancion.name;
    editCategory.value = cancion.category;
    editDuration.value = cancion.duration;
    editImageUrl.value = cancion.imageUrl;
    editPublished.checked = cancion.published;
  }

  $("#editSongModal").modal("show");
};

// Función para agregar una canción
const addSong = async (newSong) => {
  try {
    const response = await fetch(jsonServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    });

    if (response.ok) {
      await fillSongTable();
    } else {
      console.error("Error al agregar la canción");
    }
  } catch (error) {
    console.error("Error al agregar la canción:", error);
  }
};

// Función para editar una canción
const editSong = async (updatedSong) => {
  try {
    const response = await fetch(`${jsonServerUrl}/${updatedSong.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSong),
    });

    if (response.ok) {
      await fillSongTable();
    } else {
      console.error("Error al editar la canción");
    }
  } catch (error) {
    console.error("Error al editar la canción:", error);
  }
};

// Función para eliminar una canción
const deleteSong = async (songId) => {
  try {
    const response = await fetch(`${jsonServerUrl}/${songId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await fillSongTable();
    } else {
      console.error("Error al eliminar la canción");
    }
  } catch (error) {
    console.error("Error al eliminar la canción:", error);
  }
};

// Lógica para guardar una nueva canción desde el modal
document.getElementById("saveSongButton").onclick = async () => {
  const artist = document.getElementById("artistName").value;
  const songName = document.getElementById("songName").value;
  const category = document.getElementById("category").value;
  const duration = document.getElementById("duration").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const published = document.getElementById("published").checked;

  if (artist && songName && category && duration && imageUrl) {
    const newSong = {
      artist,
      name: songName,
      category,
      duration,
      imageUrl,
      published,
    };

    await addSong(newSong);
  } else {
    console.error("Datos insuficientes para agregar una canción.");
  }
};

// Lógica para guardar cambios en el modal de edición
document.getElementById("editSaveSongButton").onclick = async () => {
  const editSongId = document.getElementById("editSongId");
  const editArtistName = document.getElementById("editArtistName");
  const editSongName = document.getElementById("editSongName");
  const editCategory = document.getElementById("editCategory");
  const editDuration = document.getElementById("editDuration");
  const editImageUrl = document.getElementById("editImageUrl");
  const editPublished = document.getElementById("editPublished");

  if (editSongId && editArtistName && editSongName && editCategory && editDuration && editImageUrl) {
    const updatedSong = {
      id: editSongId.value,
      artist: editArtistName.value,
      name: editSongName.value,
      category: editCategory.value,
      duration: editDuration.value,
      imageUrl: editImageUrl.value,
      published: editPublished.checked,
    };

    await editSong(updatedSong);
  } else {
    console.error("Datos insuficientes para editar la canción.");
  }
};

// Llamar a la función para llenar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", fillSongTable);
