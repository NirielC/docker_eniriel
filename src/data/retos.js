// Banco de desafíos de la aplicación, organizado en BLOQUES.
// Cada bloque tiene varias preguntas y cada pregunta puede ser de 4 tipos:
//  - "vf":        verdadero o falso
//  - "opcion":    el usuario selecciona una respuesta (opción múltiple)
//  - "respuesta": el usuario escribe una respuesta corta
//  - "codigo":    el usuario escribe una función de JavaScript que se valida con casos de prueba
//
// Cada pregunta define sus "criterios predefinidos" para validarla:
//  - vf:        `respuesta` (true o false)
//  - opcion:    `correcta` (índice de la opción correcta)
//  - respuesta: `respuestasValidas` (lista de respuestas aceptadas)
//  - codigo:    `pruebas` (entrada -> salida esperada), `requiere` y `prohibe`

export const CATEGORIAS = [
  { id: 'Fundamentos', icono: 'llaves', color: 'mantequilla' },
  { id: 'React', icono: 'atomo', color: 'rosa' },
  { id: 'Docker', icono: 'contenedores', color: 'azul' },
  { id: 'Chatbots y NLP', icono: 'robot', color: 'rojo' },
  { id: 'APIs en C#', icono: 'enchufe', color: 'mantequilla' },
  { id: 'Kotlin', icono: 'celular', color: 'rosa' },
]

export const DIFICULTADES = {
  Fácil: 1,
  Media: 2,
  Difícil: 3,
}

export const TIPOS = {
  vf: 'Verdadero o falso',
  opcion: 'Opción múltiple',
  respuesta: 'Respuesta corta',
  codigo: 'Escribe código',
}

// Puntos que vale cada pregunta según su tipo
export const PUNTOS_POR_TIPO = {
  vf: 5,
  opcion: 10,
  respuesta: 10,
  codigo: 15,
}

// Usar la pista cuesta la mitad de los puntos de la pregunta
export const costoPista = (pregunta) => Math.floor(pregunta.puntos / 2)

const BLOQUES_BASE = [
  // =========================== FUNDAMENTOS ===========================
  {
    id: 'ciclos',
    titulo: 'Ciclos for y while',
    categoria: 'Fundamentos',
    dificultad: 'Fácil',
    descripcion: 'Repite instrucciones con for y while sin caer en ciclos infinitos.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Cuántas veces se ejecuta el console.log?',
        codigo: 'for (let i = 0; i < 5; i++) {\n  console.log(i)\n}',
        opciones: ['4 veces', '5 veces', '6 veces', 'Infinitas veces'],
        correcta: 1,
        pista: 'i toma los valores 0, 1, 2, 3 y 4.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué número imprime este código?',
        codigo: 'let i = 0\nwhile (i < 3) {\n  i++\n}\nconsole.log(i)',
        respuestasValidas: ['3'],
        pista: 'El ciclo se detiene cuando i ya no es menor que 3.',
      },
      {
        tipo: 'vf',
        enunciado: 'Un ciclo while puede no ejecutarse ni una sola vez si la condición es falsa desde el inicio.',
        respuesta: true,
        pista: 'while revisa la condición ANTES de cada vuelta.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué pasa con este ciclo?',
        codigo: 'let n = 1\nwhile (n > 0) {\n  n++\n}',
        opciones: ['Se repite 1 vez', 'Nunca se ejecuta', 'Es un ciclo infinito', 'Da error de sintaxis'],
        correcta: 2,
        pista: 'n siempre crece... ¿alguna vez dejará de ser mayor que 0?',
      },
      {
        tipo: 'codigo',
        enunciado:
          'Completa la función sumarHasta(n) para que devuelva la suma de 1 hasta n usando un ciclo for. Ejemplo: sumarHasta(4) → 10 (1 + 2 + 3 + 4).',
        nombreFuncion: 'sumarHasta',
        plantilla: 'function sumarHasta(n) {\n  let suma = 0\n  // usa un ciclo for aquí\n\n  return suma\n}',
        pruebas: [
          { entrada: [4], esperado: 10 },
          { entrada: [1], esperado: 1 },
          { entrada: [10], esperado: 55 },
        ],
        requiere: ['for'],
        pista: 'for (let i = 1; i <= n; i++) { suma += i }',
      },
    ],
  },
  {
    id: 'condicionales',
    titulo: 'Condicionales',
    categoria: 'Fundamentos',
    dificultad: 'Fácil',
    descripcion: 'Toma decisiones con if, else, operadores lógicos y switch.',
    preguntas: [
      {
        tipo: 'respuesta',
        enunciado: '¿Qué letra imprime este código?',
        codigo:
          'let nota = 7\nif (nota >= 9) {\n  console.log("A")\n} else if (nota >= 6) {\n  console.log("B")\n} else {\n  console.log("C")\n}',
        respuestasValidas: ['B'],
        pista: '7 no es mayor o igual a 9, pero sí a 6.',
      },
      {
        tipo: 'vf',
        enunciado: 'El operador === compara el valor y también el tipo de dato.',
        respuesta: true,
        pista: 'Por eso 5 === "5" da false.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Cuál es el resultado de esta expresión?',
        codigo: '10 > 5 && 3 > 8',
        opciones: ['true', 'false', 'undefined', '10'],
        correcta: 1,
        pista: '&& solo da true si los dos lados son true.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué imprime este código?',
        codigo:
          'let dia = 2\nswitch (dia) {\n  case 1: console.log("Lunes"); break\n  case 2: console.log("Martes"); break\n  default: console.log("Otro día")\n}',
        opciones: ['Lunes', 'Martes', 'Otro día', 'No imprime nada'],
        correcta: 1,
        pista: 'switch busca el case que coincide con el valor de dia.',
      },
      {
        tipo: 'codigo',
        enunciado: 'Completa esMayorDeEdad(edad) para que devuelva true si la edad es 18 o más, y false si no.',
        nombreFuncion: 'esMayorDeEdad',
        plantilla: 'function esMayorDeEdad(edad) {\n  // tu código aquí\n}',
        pruebas: [
          { entrada: [18], esperado: true },
          { entrada: [25], esperado: true },
          { entrada: [15], esperado: false },
        ],
        pista: 'return edad >= 18',
      },
    ],
  },
  {
    id: 'arreglos',
    titulo: 'Arreglos',
    categoria: 'Fundamentos',
    dificultad: 'Fácil',
    descripcion: 'Guarda varios datos en una lista y recórrela.',
    preguntas: [
      {
        tipo: 'respuesta',
        enunciado: '¿Qué número imprime?',
        codigo: 'const frutas = ["manzana", "pera", "uva"]\nconsole.log(frutas.length)',
        respuestasValidas: ['3'],
        pista: 'length cuenta cuántos elementos hay.',
      },
      {
        tipo: 'vf',
        enunciado: 'El primer elemento de un arreglo está en la posición 1.',
        respuesta: false,
        pista: 'Los índices empiezan a contar desde 0.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué número imprime?',
        codigo: 'const numeros = [10, 20, 30]\nconsole.log(numeros[1])',
        respuestasValidas: ['20'],
        pista: 'La posición 0 es 10, la posición 1 es...',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué método agrega un elemento al FINAL de un arreglo?',
        opciones: ['push()', 'pop()', 'shift()', 'slice()'],
        correcta: 0,
        pista: 'En inglés significa "empujar".',
      },
      {
        tipo: 'codigo',
        enunciado:
          'Completa contarPares(numeros) para que devuelva cuántos números pares hay en el arreglo. Ejemplo: contarPares([1, 2, 3, 4]) → 2.',
        nombreFuncion: 'contarPares',
        plantilla: 'function contarPares(numeros) {\n  let contador = 0\n  // recorre el arreglo aquí\n\n  return contador\n}',
        pruebas: [
          { entrada: [[1, 2, 3, 4]], esperado: 2 },
          { entrada: [[1, 3, 5]], esperado: 0 },
          { entrada: [[2, 4, 6, 8]], esperado: 4 },
        ],
        pista: 'Usa un for y la condición numero % 2 === 0 para saber si es par.',
      },
      {
        tipo: 'codigo',
        enunciado:
          'Completa duplicar(numeros) para que devuelva un NUEVO arreglo con cada número multiplicado por 2, usando el método map.',
        nombreFuncion: 'duplicar',
        plantilla: 'function duplicar(numeros) {\n  // tu código aquí\n}',
        pruebas: [
          { entrada: [[1, 2, 3]], esperado: [2, 4, 6] },
          { entrada: [[0, 5]], esperado: [0, 10] },
        ],
        requiere: ['map'],
        pista: 'return numeros.map((n) => n * 2)',
      },
    ],
  },
  {
    id: 'verdadero-falso',
    titulo: 'Verdadero o falso: lo básico',
    categoria: 'Fundamentos',
    dificultad: 'Fácil',
    descripcion: 'Seis afirmaciones rápidas sobre programación en general.',
    preguntas: [
      {
        tipo: 'vf',
        enunciado: 'JavaScript y Java son el mismo lenguaje.',
        respuesta: false,
        pista: 'Solo se parecen en el nombre.',
      },
      {
        tipo: 'vf',
        enunciado: 'Un algoritmo es una serie de pasos ordenados para resolver un problema.',
        respuesta: true,
        pista: 'Como una receta de cocina.',
      },
      {
        tipo: 'vf',
        enunciado: 'HTML es un lenguaje de programación.',
        respuesta: false,
        pista: 'HTML es un lenguaje de MARCADO: estructura el contenido.',
      },
      {
        tipo: 'vf',
        enunciado: 'Git sirve para llevar el control de versiones del código.',
        respuesta: true,
        pista: 'Es el que usamos con GitHub.',
      },
      {
        tipo: 'vf',
        enunciado: 'En CSS, el color del texto se cambia con la propiedad font-size.',
        respuesta: false,
        pista: 'font-size cambia el tamaño, no el color.',
      },
      {
        tipo: 'vf',
        enunciado: 'JSON es un formato de texto para intercambiar datos.',
        respuesta: true,
        pista: 'Es el formato que devuelven casi todas las APIs.',
      },
    ],
  },

  // ============================== REACT ==============================
  {
    id: 'react-componentes',
    titulo: 'Componentes y props',
    categoria: 'React',
    dificultad: 'Fácil',
    descripcion: 'Las piezas con las que se arma una interfaz en React.',
    preguntas: [
      {
        tipo: 'vf',
        enunciado: 'Un componente de React es una función que retorna JSX.',
        respuesta: true,
        pista: 'Por ejemplo: function Saludo() { return <h1>Hola</h1> }',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Cuál es la forma correcta de enviar la prop nombre al componente?',
        codigo: '<Saludo ______ />',
        opciones: ['nombre="Ana"', '(nombre: "Ana")', 'nombre => "Ana"', '[nombre = Ana]'],
        correcta: 0,
        pista: 'Se escribe igual que un atributo de HTML.',
      },
      {
        tipo: 'vf',
        enunciado: 'Un componente hijo puede modificar directamente sus props.',
        respuesta: false,
        pista: 'Las props son de solo lectura.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué método de los arreglos se usa para mostrar una lista de elementos en JSX?',
        respuestasValidas: ['map', 'map()', '.map', '.map()'],
        pista: 'Transforma cada elemento del arreglo en un elemento JSX.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Para qué sirve la prop key al renderizar una lista?',
        codigo: 'retos.map((reto) => <Tarjeta key={reto.id} />)',
        opciones: [
          'Para darle estilos a cada elemento',
          'Para que React identifique cada elemento y actualice solo lo que cambió',
          'Para ordenar la lista alfabéticamente',
          'Es obligatoria solo en formularios',
        ],
        correcta: 1,
        pista: 'Tiene que ver con cómo React compara la lista anterior con la nueva.',
      },
    ],
  },
  {
    id: 'react-estado',
    titulo: 'Estado y eventos',
    categoria: 'React',
    dificultad: 'Fácil',
    descripcion: 'useState, useEffect y cómo reaccionar a lo que hace el usuario.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Qué hook se usa para guardar un valor que cambia y vuelve a dibujar el componente?',
        opciones: ['useEffect', 'useState', 'useRef', 'useMemo'],
        correcta: 1,
        pista: 'Su nombre dice "estado" en inglés.',
      },
      {
        tipo: 'opcion',
        enunciado: 'En esta línea, ¿qué es setContador?',
        codigo: 'const [contador, setContador] = useState(0)',
        opciones: ['El valor inicial', 'La función para cambiar el estado', 'Un componente', 'Un evento'],
        correcta: 1,
        pista: 'Empieza con "set" porque sirve para cambiar algo.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué evento se usa para detectar el clic en un botón?',
        opciones: ['onClick', 'onChange', 'onSubmit', 'onHover'],
        correcta: 0,
        pista: '"Click" en inglés.',
      },
      {
        tipo: 'vf',
        enunciado: 'Al cambiar el estado con su función set, React vuelve a renderizar el componente.',
        respuesta: true,
        pista: 'Por eso la pantalla se actualiza sola.',
      },
      {
        tipo: 'respuesta',
        enunciado:
          'Escribe el nombre del hook que se ejecuta después del renderizado y se usa, por ejemplo, para guardar datos en localStorage.',
        respuestasValidas: ['useEffect', 'useEffect()', 'React.useEffect'],
        pista: 'Empieza con "use" y en inglés "efecto" es effect.',
      },
    ],
  },

  // ============================== DOCKER ==============================
  {
    id: 'docker-conceptos',
    titulo: 'Conceptos de Docker',
    categoria: 'Docker',
    dificultad: 'Fácil',
    descripcion: 'Imágenes, contenedores, Dockerfile y Docker Hub.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Cuál es la diferencia entre una imagen y un contenedor?',
        opciones: [
          'Son exactamente lo mismo',
          'La imagen es la plantilla y el contenedor es la imagen en ejecución',
          'El contenedor es la plantilla y la imagen es lo que se ejecuta',
          'La imagen solo existe en Docker Hub',
        ],
        correcta: 1,
        pista: 'Piensa en la imagen como un molde.',
      },
      {
        tipo: 'vf',
        enunciado: 'Un contenedor necesita un sistema operativo completo, igual que una máquina virtual.',
        respuesta: false,
        pista: 'Los contenedores comparten el kernel del sistema anfitrión.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Cómo se llama el archivo con las instrucciones para construir una imagen?',
        respuestasValidas: ['Dockerfile'],
        pista: 'Docker + file.',
      },
      {
        tipo: 'respuesta',
        enunciado: 'Completa la instrucción del Dockerfile que define la imagen base:',
        codigo: '____ node:24-alpine',
        respuestasValidas: ['FROM'],
        pista: 'En inglés significa "desde".',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Para qué sirve el archivo .dockerignore?',
        opciones: [
          'Para ignorar los errores al construir',
          'Para indicar qué archivos NO se copian a la imagen',
          'Para borrar contenedores viejos',
          'Para ocultar el puerto',
        ],
        correcta: 1,
        pista: 'Funciona igual que .gitignore.',
      },
      {
        tipo: 'vf',
        enunciado: 'Docker Hub es un repositorio en la nube para guardar y compartir imágenes.',
        respuesta: true,
        pista: 'Es como GitHub, pero para imágenes.',
      },
    ],
  },
  {
    id: 'docker-comandos',
    titulo: 'Comandos y Compose',
    categoria: 'Docker',
    dificultad: 'Media',
    descripcion: 'Los comandos que usamos para construir, ejecutar y publicar.',
    preguntas: [
      {
        tipo: 'respuesta',
        enunciado: 'Completa el comando para construir una imagen:',
        codigo: 'docker _____ -t mi-app .',
        respuestasValidas: ['build'],
        pista: '"Construir" en inglés.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué significa -p 8080:5173 en docker run?',
        opciones: [
          'El puerto 8080 de tu PC se conecta al 5173 del contenedor',
          'El contenedor usa el 8080 y la PC el 5173',
          'Se crean dos contenedores',
          'Es la versión de la imagen',
        ],
        correcta: 0,
        pista: 'El formato es puertoPC:puertoContenedor.',
      },
      {
        tipo: 'respuesta',
        enunciado: 'Completa el comando para subir la imagen a Docker Hub:',
        codigo: 'docker ____ usuario/retos-app:v1.0',
        respuestasValidas: ['push'],
        pista: 'Lo contrario de pull.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué hace docker compose down?',
        opciones: [
          'Descarga la imagen',
          'Detiene y elimina los contenedores del compose',
          'Construye la imagen',
          'Muestra los registros',
        ],
        correcta: 1,
        pista: '"Down" = bajar / apagar.',
      },
      {
        tipo: 'vf',
        enunciado: 'En compose.yaml, la sección ports conecta un puerto de tu computadora con uno del contenedor.',
        respuesta: true,
        pista: 'Igual que -p en docker run.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Por qué Vite se ejecuta con --host 0.0.0.0 dentro del contenedor?',
        opciones: [
          'Para que cargue más rápido',
          'Para que acepte conexiones desde fuera del contenedor',
          'Para usar HTTPS',
          'Para cambiar el puerto',
        ],
        correcta: 1,
        pista: 'Por defecto Vite solo escucha en localhost (dentro del contenedor).',
      },
    ],
  },

  // ========================== CHATBOTS Y NLP ==========================
  {
    id: 'nlp',
    titulo: 'Procesamiento de lenguaje',
    categoria: 'Chatbots y NLP',
    dificultad: 'Fácil',
    descripcion: 'Tokenización, lematización y stopwords.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Qué es la tokenización?',
        opciones: [
          'Traducir un texto a otro idioma',
          'Dividir un texto en partes más pequeñas llamadas tokens',
          'Cifrar un texto con una contraseña',
          'Corregir la ortografía',
        ],
        correcta: 1,
        pista: 'Los tokens suelen ser palabras o signos.',
      },
      {
        tipo: 'respuesta',
        enunciado: 'Si separamos por palabras, ¿cuántos tokens tiene esta oración?',
        codigo: '"me gusta programar en react"',
        respuestasValidas: ['5', 'cinco'],
        pista: 'Cuenta las palabras separadas por espacios.',
      },
      {
        tipo: 'opcion',
        enunciado: 'La lematización convierte una palabra en su forma base (lema). ¿Cuál es el lema de «corriendo»?',
        opciones: ['corr', 'corriendo', 'correr', 'carrera'],
        correcta: 2,
        pista: 'El lema de un verbo es su infinitivo.',
      },
      {
        tipo: 'vf',
        enunciado:
          'Las stopwords son palabras muy comunes (el, la, de, y) que muchas veces se eliminan al procesar un texto.',
        respuesta: true,
        pista: 'Aportan poco significado por sí solas.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Cuál es la diferencia entre stemming y lematización?',
        opciones: [
          'Son exactamente lo mismo',
          'El stemming recorta la palabra a su raíz; la lematización usa el diccionario para dar la forma correcta',
          'La lematización solo funciona en inglés',
          'El stemming traduce las palabras',
        ],
        correcta: 1,
        pista: 'Stemming de «corriendo» → «corr»; lematización → «correr».',
      },
      {
        tipo: 'codigo',
        enunciado:
          'Completa tokenizar(texto) para que devuelva un arreglo con las palabras del texto, separadas por espacios.',
        nombreFuncion: 'tokenizar',
        plantilla: 'function tokenizar(texto) {\n  // tu código aquí\n}',
        pruebas: [
          { entrada: ['hola mundo'], esperado: ['hola', 'mundo'] },
          { entrada: ['me gusta docker'], esperado: ['me', 'gusta', 'docker'] },
        ],
        pista: 'return texto.split(" ")',
      },
    ],
  },
  {
    id: 'chatbots',
    titulo: 'Chatbots',
    categoria: 'Chatbots y NLP',
    dificultad: 'Fácil',
    descripcion: 'Intenciones, entidades y un bot de reglas sencillo.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: 'En un chatbot, ¿qué es una intención (intent)?',
        opciones: [
          'El nombre del chatbot',
          'Lo que el usuario quiere lograr con su mensaje',
          'El idioma del mensaje',
          'La base de datos del bot',
        ],
        correcta: 1,
        pista: 'Ejemplo: "saludar", "reservar", "pedir ayuda".',
      },
      {
        tipo: 'opcion',
        enunciado: 'En el mensaje «Quiero reservar una mesa para el viernes», ¿cuál es la entidad de fecha?',
        opciones: ['Quiero', 'reservar', 'mesa', 'viernes'],
        correcta: 3,
        pista: 'Una entidad es un dato concreto dentro del mensaje.',
      },
      {
        tipo: 'vf',
        enunciado: 'Un chatbot basado en reglas responde según palabras clave o patrones definidos previamente.',
        respuesta: true,
        pista: 'No "piensa": compara el mensaje con sus reglas.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué método de JavaScript convierte un texto a minúsculas? (sirve para normalizar los mensajes)',
        respuestasValidas: ['toLowerCase', 'toLowerCase()', '.toLowerCase', '.toLowerCase()'],
        pista: 'to + Lower + Case.',
      },
      {
        tipo: 'codigo',
        enunciado:
          'Completa responder(mensaje): si el mensaje incluye "hola" (sin importar mayúsculas) devuelve "¡Hola! ¿En qué te ayudo?"; si no, devuelve "No entendí tu mensaje".',
        nombreFuncion: 'responder',
        plantilla:
          'function responder(mensaje) {\n  // si incluye "hola" → "¡Hola! ¿En qué te ayudo?"\n  // si no            → "No entendí tu mensaje"\n}',
        pruebas: [
          { entrada: ['hola'], esperado: '¡Hola! ¿En qué te ayudo?' },
          { entrada: ['HOLA amigo'], esperado: '¡Hola! ¿En qué te ayudo?' },
          { entrada: ['adiós'], esperado: 'No entendí tu mensaje' },
        ],
        pista: 'if (mensaje.toLowerCase().includes("hola")) { ... }',
      },
    ],
  },

  // ============================ APIs EN C# ============================
  {
    id: 'apis',
    titulo: 'APIs REST con ASP.NET',
    categoria: 'APIs en C#',
    dificultad: 'Fácil',
    descripcion: 'Métodos HTTP, códigos de estado y controladores.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Qué método HTTP se usa para CREAR un nuevo registro?',
        opciones: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        correcta: 1,
        pista: 'Es el que envía datos en el cuerpo de la petición.',
      },
      {
        tipo: 'vf',
        enunciado: 'El método GET se usa para obtener (leer) datos.',
        respuesta: true,
        pista: '"Get" = obtener.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué significa el código de estado 404?',
        opciones: ['Todo salió bien', 'Error del servidor', 'Recurso no encontrado', 'No autorizado'],
        correcta: 2,
        pista: 'Es el famoso "Not Found".',
      },
      {
        tipo: 'respuesta',
        enunciado: 'Completa el atributo de un endpoint que obtiene datos:',
        codigo: '[Http___]\npublic IActionResult ObtenerProductos()\n{\n    return Ok(productos);\n}',
        respuestasValidas: ['Get', 'HttpGet', '[HttpGet]'],
        pista: 'Es el mismo nombre del método HTTP para leer.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué devuelve esta línea dentro de un controlador?',
        codigo: 'return Ok(productos);',
        opciones: ['Un error 500', 'Una respuesta 200 con la lista de productos', 'Un error 404', 'Nada'],
        correcta: 1,
        pista: 'Ok = 200.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué formato de datos usan normalmente las APIs REST para responder?',
        opciones: ['JSON', 'PDF', 'MP3', 'EXE'],
        correcta: 0,
        pista: 'Se ve parecido a un objeto de JavaScript.',
      },
    ],
  },
  {
    id: 'csharp',
    titulo: 'C# básico',
    categoria: 'APIs en C#',
    dificultad: 'Fácil',
    descripcion: 'Tipos de datos, ciclos y listas en C#.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Qué tipo de dato se usa para guardar texto en C#?',
        opciones: ['int', 'bool', 'string', 'double'],
        correcta: 2,
        pista: 'Una "cadena" de caracteres.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué imprime este código?',
        codigo: 'for (int i = 1; i <= 3; i++)\n{\n    Console.Write(i);\n}',
        respuestasValidas: ['123'],
        pista: 'Console.Write no hace salto de línea: los números quedan pegados.',
      },
      {
        tipo: 'vf',
        enunciado: 'En C#, las instrucciones terminan con punto y coma (;).',
        respuesta: true,
        pista: 'Igual que en Java.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué crea esta línea?',
        codigo: 'List<string> nombres = new List<string>();',
        opciones: ['Un número', 'Una lista vacía de textos', 'Un arreglo de números', 'Una clase nueva'],
        correcta: 1,
        pista: 'Lo que va entre < > es el tipo de los elementos.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué imprime este código?',
        codigo: 'int x = 10;\nint y = 3;\nConsole.WriteLine(x + y);',
        respuestasValidas: ['13'],
        pista: 'Es una suma normal.',
      },
    ],
  },

  // ============================== KOTLIN ==============================
  {
    id: 'kotlin',
    titulo: 'Kotlin básico',
    categoria: 'Kotlin',
    dificultad: 'Fácil',
    descripcion: 'Variables, funciones, rangos y nulos en Kotlin.',
    preguntas: [
      {
        tipo: 'opcion',
        enunciado: '¿Cuál es la diferencia entre val y var?',
        opciones: [
          'No hay ninguna diferencia',
          'val no se puede reasignar, var sí',
          'var no se puede reasignar, val sí',
          'val solo sirve para números',
        ],
        correcta: 1,
        pista: 'val = value (valor fijo), var = variable.',
      },
      {
        tipo: 'vf',
        enunciado: 'En Kotlin las funciones se declaran con la palabra fun.',
        respuesta: true,
        pista: 'Ejemplo: fun saludar() { ... }',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué imprime este código?',
        codigo: 'for (i in 1..4) {\n    print(i)\n}',
        respuestasValidas: ['1234'],
        pista: '1..4 es un rango que incluye el 1 y el 4.',
      },
      {
        tipo: 'respuesta',
        enunciado: '¿Qué imprime este código?',
        codigo: 'val nombre = "Ana"\nprintln("Hola $nombre")',
        respuestasValidas: ['Hola Ana'],
        pista: '$nombre se reemplaza por el valor de la variable.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué significa el signo ? en esta línea?',
        codigo: 'var apodo: String? = null',
        opciones: ['Que la variable es privada', 'Que la variable puede ser nula', 'Que es una pregunta', 'Que es un número'],
        correcta: 1,
        pista: 'Kotlin no deja usar null a menos que lo indiques.',
      },
      {
        tipo: 'opcion',
        enunciado: '¿Qué estructura de Kotlin funciona parecido a switch?',
        opciones: ['when', 'case', 'select', 'match'],
        correcta: 0,
        pista: '"Cuando" en inglés.',
      },
    ],
  },
]

// Completa cada pregunta con su id y sus puntos.
// Las de verdadero o falso se convierten en opción múltiple con dos opciones.
export const BLOQUES = BLOQUES_BASE.map((bloque) => ({
  ...bloque,
  preguntas: bloque.preguntas.map((pregunta, indice) => ({
    ...pregunta,
    id: `${bloque.id}-${indice + 1}`,
    puntos: PUNTOS_POR_TIPO[pregunta.tipo],
    ...(pregunta.tipo === 'vf' && {
      opciones: ['Verdadero', 'Falso'],
      correcta: pregunta.respuesta ? 0 : 1,
    }),
  })),
}))
