const pokemonInput = document.getElementById('pokemonInput');
    const fetchPokemonButton = document.getElementById('fetchPokemonButton');
    const pokemonResult = document.getElementById('pokemonResult');
    const errorMessageDiv = document.getElementById('errorMessage'); // Get the error div

    fetchPokemonButton.addEventListener('click', fetchPokemon);

    async function fetchPokemon() {
        const pokemonIdentifier = pokemonInput.value.toLowerCase().trim(); // Get input, lowercase, no whitespace

        // --- Input Validation ---
        if (pokemonIdentifier === '') {
            errorMessageDiv.textContent = 'Por favor, ingrese el nombre o ID del Pokémon.';
            pokemonResult.innerHTML = '<p>Resultados de la búsqueda aparecerán aquí.</p>'; // Clear previous result
            return; // Stop the function
        } else {
            errorMessageDiv.textContent = ''; // Clear any previous error message
        }
        // --- End Input Validation ---


        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`;

        // Clear previous results and show loading (optional but good practice)
        pokemonResult.innerHTML = '<p>Cargando...</p>';
        errorMessageDiv.textContent = ''; // Clear error on new search

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Handle HTTP errors (e.g., 404 Not Found)
                if (response.status === 404) {
                    errorMessageDiv.textContent = `Pokémon con nombre o ID "${pokemonIdentifier}" no encontrado.`;
                    pokemonResult.innerHTML = '<p>Resultados de la búsqueda aparecerán aquí.</p>';
                } else {
                     errorMessageDiv.textContent = `Error al buscar Pokémon: ${response.status}`;
                     pokemonResult.innerHTML = '<p>Resultados de la búsqueda aparecerán aquí.</p>';
                }
                return; // Stop if response was not OK
            }

            const data = await response.json();

            // Display Pokémon information
            pokemonResult.innerHTML = `
                <h2><span class="math-inline">\{data\.name\.charAt\(0\)\.toUpperCase\(\) \+ data\.name\.slice\(1\)\} \(\#</span>{data.id})</h2>
                <img src="<span class="math-inline">\{data\.sprites\.front\_default\}" alt\="</span>{data.name}">
                <p>Altura: ${data.height / 10} m</p>
                <p>Peso: ${data.weight / 10} kg</p>
                <p>Tipos: ${data.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)).join(', ')}</p>
            `;

        } catch (error) {
            // Handle network errors or other issues
            console.error('Error fetching data:', error);
            errorMessageDiv.textContent = 'Ocurrió un error al intentar obtener los datos.';
            pokemonResult.innerHTML = '<p>Resultados de la búsqueda aparecerán aquí.</p>';
        }
    }

    // Optional: Add functionality to search on pressing Enter key in the input field
    pokemonInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission if input is in a form
            fetchPokemon();
        }
    });