//inciso d.	Validación de formulario:
// 1. Función declarativa
function cuadrado(x) {
    return x * x;
}

function mostrarCuadrado() {
    const numero = document.getElementById('numeroCuadrado').value;
    const resultado = cuadrado(numero);
    
    document.getElementById('resultadoCuadrado').innerHTML = 
        Number.isInteger(Number.parseInt(numero))? `El cuadrado de ${numero} es ${resultado}`:'Error en el formato numérico';
}

// 2. Función expresiva
const potencia = function(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
};
//inciso d.	Validación de formulario:
function mostrarPotencia() {
    const base = document.getElementById('base').value;
    const exponente = document.getElementById('exponente').value;
    const resultado = potencia(base, exponente);

    let mensaje = 'Datos incorrectos en: ';    
    mensaje = Number.isInteger(Number.parseInt(base)) ? mensaje : mensaje+' "base" ';
    mensaje = Number.isInteger(Number.parseInt(exponente)) ? mensaje : mensaje+' "exponente" ';

    document.getElementById('resultadoPotencia').innerHTML = 
        mensaje.length<27?`${base} elevado a ${exponente} = ${resultado}`:mensaje;
}
//inciso d.	Validación de formulario:
// 3. Arrow function
const dividir = (a, b) => a / b;

function mostrarDivision() {
    const dividendo = parseInt(document.getElementById('dividendo').value);
    const divisor = parseInt(document.getElementById('divisor').value);
    const resultado = dividir(dividendo, divisor);
    
    let mensaje = 'Datos incorrectos en: ';    
    mensaje = (Number(dividendo)===dividendo && dividendo!==0) ? mensaje : mensaje+' "dividendo" ';
    mensaje = (Number(divisor)===divisor && divisor!==0) ? mensaje : mensaje+' "divisor" ';

    document.getElementById('resultadoDivision').innerHTML = 
        mensaje.length<27 ?`${dividendo} ÷ ${divisor} = ${resultado.toFixed(2)}`:mensaje;
}

// 4. Función anidada
function humus(factor) {
    const ingrediente = (cantidad, unidad, nombre) => {
        const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
        document.getElementById('resultadoHummus').innerHTML += mensaje;
    };
    
    document.getElementById('resultadoHummus').innerHTML = '';
    ingrediente(1, "lata", "garbanzos");
    ingrediente(0.5, "taza", "tahini");
    ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
    humus(2);
}

// 5. Scope
function probarScope() {
    let x = "global";
    let resultado = '';

    function prueba() {
        let x = "local";
        resultado += `Dentro: ${x}<br>`;
    }

    prueba();
    resultado += `Fuera: ${x}`;
    document.getElementById('resultadoScope').innerHTML = resultado;
}
//inciso d.	Validación de formulario:
// 6. Factorial (recursividad)
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
    const numero = document.getElementById('numeroFactorial').value;
    const resultado = factorial(numero);
    document.getElementById('resultadoFactorial').innerHTML =         
        Number.isInteger(Number.parseInt(numero))? `${numero}! = ${resultado}`:'Error en el formato numérico';
}
//inciso c. Extender las funciones
//inciso d.	Validación de formulario:
// 7. Calculando el índice de masa corporal (IMC)

function calcularIMC() {
    const peso = parseFloat(document.getElementById('numeroPeso').value);
    const altura = parseFloat(document.getElementById('numeroAltura').value);
    const resultado = (peso/altura).toFixed(2);
    
    let mensaje = 'Datos incorrectos en: ';    
    mensaje = (Number(peso)===peso && peso!==0) ? mensaje : mensaje+' "Peso" ';
    mensaje = (Number(altura)===altura && altura!==0) ? mensaje : mensaje+' "Altura" ';


    document.getElementById('resultadoIMC').innerHTML = mensaje.length>27 ? mensaje : `IMC = ${resultado}`;
}    
    


// Función para cambiar secciones
function cambiarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.boton-menu').forEach(btn => btn.classList.remove('active'));    
    document.getElementById(seccionId).classList.add('active');
    event.target.classList.add('active');
    if (seccionId==='api_nueva'){obtenerPerroAleatorio()}
}

// Ejemplo de nueva api
// respondiendo inciso e. Nuevo consumo de API:
function obtenerPerroAleatorio(){
    const dogImage = document.getElementById('dogImage');
        const fetchDogButton = document.getElementById('boton');
        const loadingText = document.getElementById('loading');

        async function fetchRandomDogImage() {
            dogImage.style.display = 'none'; // Hide previous image
            loadingText.style.display = 'block'; // Show loading text

            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();

                if (data.status === 'success') {
                    dogImage.src = data.message;
                    dogImage.style.display = 'block'; // mostramos la imagen
                } else {
                    console.error('Error fetching dog image:', data.message);
                    alert('No se pudo cargar la imagen del perro.');
                }
            } catch (error) {
                console.error('Error durante la respuesta:', error);
                alert('Ocurrió un error al intentar obtener la imagen...');
            } finally {
                loadingText.style.display = 'none'; // Hide loading text
            }
        }

        // Fetch an image when the page loads
        fetchRandomDogImage();

        // Add event listener to the button
        fetchDogButton.addEventListener('click', fetchRandomDogImage);
}


// Ejemplo 1: Obtener Pokémon básico (Promesas)
function obtenerPokemon() {
    const id = document.getElementById('pokemonId').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon no encontrado');
            return response.json();
        })
        .then(data => {
            const html = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" class="img-pokemon">
                <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
                <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
            document.getElementById('pokemonResult').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('pokemonResult').innerHTML = `Error: ${error.message}`;
        });
}

// Ejemplo 2: Cadena de evoluciones (Async/Await)
async function obtenerEvoluciones() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/1');
        const data = await response.json();
        
        let html = '<h3>Cadena de Evolución de Bulbasaur:</h3>';
        let chain = data.chain;
        
        while(chain) {
            html += `<p>${chain.species.name} → `;
            chain = chain.evolves_to[0];
        }
        
        html = html.replace(/→ $/, ''); // Eliminar última flecha
        document.getElementById('evolucionesResult').innerHTML = html;
        
    } catch (error) {
        document.getElementById('evolucionesResult').innerHTML = `Error: ${error.message}`;
    }
}

// Ejemplo 3: Pokémon aleatorio (Fetch + Then)
function pokemonAleatorio() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(pokemon => {
            const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
            document.getElementById('randomPokemon').innerHTML = `
                <h3>${pokemon.name} (#${pokemon.id})</h3>
                <img src="${pokemon.sprites.front_default}" class="img-pokemon">
                <p>Habilidades: ${abilities}</p>
            `;
        });
}

// f.	Manejo avanzado de errores:
// Ejemplo 4: Pokémon por nombre (Fetch + Async/Await)
async function pokemonPorNombre() {
    const nombre = document.getElementById('pokemonNombre').value.toLowerCase();
    console.log(nombre);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!response.ok) throw new Error(`<div class="error" > Error: Pokémon ${nombre} no encontrado</div>`);
        
        const pokemon = await response.json();
        const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
        document.getElementById('pokemonNameResult').innerHTML = `
            <h3>${pokemon.name} (#${pokemon.id})</h3>
            <img src="${pokemon.sprites.front_default}" class="img-pokemon">
            <p>Habilidades: ${abilities}</p>
        `;
    } catch (error) {
        document.getElementById('pokemonNameResult').innerHTML = `${error.message}`;
    }
}