const genreEL = document.getElementById('genero-juegos');
const genreFilterEL = document.getElementById('genre-filter');
const dateFilterEL = document.getElementById('date-filter');

if (!genreEL) {
    console.error("Elemento #genero-juegos no encontrado en el DOM");
}

// buscar juegos en la API

async function searchGames(game, date) {
    let url = 'https://api.rawg.io/api/games?key=91e7c182b5cf4df5bf7892b27da5e5f6';

    let params = [];

    if (game) {
        params.push(`search=${encodeURIComponent(game)}`);
    }
    if (date) {
        params.push(`dates=${date}`);
    }

    if (params.length > 0) {
        url += `&${params.join("&")}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("Resultados de la búsqueda:", data.results);
        return data.results;
    } catch (error) {
        console.error("Error al buscar juegos:", error);
        return [];
    }
}

// mostrar los juegos en la página

async function displayGames(game = "", date = "") {
    const games = await searchGames(game, date);

    // borrar contenido anterior

    genreEL.innerHTML = '';

    if (!games || games.length === 0) {
        genreEL.innerHTML = "<p>No se encontraron juegos.</p>";
        return;
    }

    for (let game of games) {
        const card = document.createElement('div');
        card.classList.add('game-card');

        card.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}" />
            <h2>${game.name}</h2>
            <p>Lanzamiento: ${game.released || "No disponible"}</p>
            <p>Rating: ${game.rating || "N/A"}</p>
        `;

        genreEL.appendChild(card);
    }
}

// búsqueda inicial sin filtros
displayGames();

// filtrar por género cuando se ingrese texto

genreFilterEL.addEventListener('input', () => {
    displayGames(genreFilterEL.value);
});
