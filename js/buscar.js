const searchInput = document.getElementById("searchInput");
const resultList = document.getElementById("resultsList");
const noResults = document.getElementById("noResults");

let library = [];

// Cargar datos desde JSON
fetch("../json/biblioteca.json")
  .then((response) => response.json())
  .then((data) => {
    library = data; // Almacenar datos para búsquedas rápidas
  });

const handleSearch = () => {
  const searchTerm = searchInput.value.toLowerCase();

  // Filtrar datos por nombre de canción o artista
  const filteredResults = library.filter((item) =>
    item.artista.toLowerCase().includes(searchTerm) ||
    item.nombre.toLowerCase().includes(searchTerm)
  );

  resultList.innerHTML = ""; // Limpiar resultados anteriores

  if (filteredResults.length === 0) {
    noResults.style.display = "block"; // Mostrar mensaje de "No se encontraron resultados"
  } else {
    filteredResults.forEach((item) => {
      const li = document.createElement("li");
      li.className = "list-group-item"; // Aplicar estilo de Bootstrap a los resultados
      li.textContent = `${item.nombre} - ${item.artista}`;
      resultList.appendChild(li);
    });
    noResults.style.display = "none"; // Ocultar mensaje de "No se encontraron resultados"
  }

  // Si el campo de búsqueda está vacío, limpiar la lista de resultados
  if (searchInput.value === "") {
    resultList.innerHTML = "";
    noResults.style.display = "none"; // Asegurarse de ocultar el mensaje
  }
};

searchInput.addEventListener("input", handleSearch); // Búsqueda en tiempo real
