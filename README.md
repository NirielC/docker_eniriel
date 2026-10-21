# Retoma · Aplicación de retos de programación (Tema 10)

**Retoma** = *reto* + *retomar*: el progreso se guarda en **localStorage**, así que siempre retomas
donde lo dejaste. Aplicación web hecha con **React + Vite** que muestra desafíos de programación
organizados en **bloques**, permite **seleccionar respuestas o escribir soluciones**, las **valida con
criterios predefinidos** y **acumula puntos**.

## Imagen en Docker Hub

**Repositorio:** https://hub.docker.com/r/eniriel/retos-app (versión `v1.0`)

Para descargar y ejecutar la aplicación desde Docker Hub:

```bash
docker pull eniriel/retos-app:v1.0
```

```bash
docker run -p 5173:5173 eniriel/retos-app:v1.0
```

Luego abrir http://localhost:5173

## Funcionalidades (según el tema 10)

| Requisito del tema | Cómo se cumple |
| --- | --- |
| Mostrar desafíos | 13 bloques con 72 preguntas en 6 categorías (Fundamentos, React, Docker, Chatbots y NLP, APIs en C#, Kotlin), con filtro por categoría |
| Seleccionar respuestas | Preguntas de **opción múltiple** (A, B, C, D) y de **verdadero o falso** |
| Introducir soluciones | Preguntas de **respuesta corta** y de **código** (editor donde escribes una función de JavaScript) |
| Validar criterios predefinidos | Cada pregunta trae sus criterios: opción correcta, respuestas aceptadas, o casos de prueba + palabras requeridas/prohibidas |
| Acumular puntos | Verdadero/falso 5, opción múltiple 10, respuesta corta 10, código 15. La pista cuesta la mitad. Solo suma la primera vez |

Cada bloque tiene de 5 a 6 preguntas que se responden una por una (con pasos numerados arriba) y al
terminar muestra un resumen con los puntos ganados.

Extras: panel del jugador (nombre editable, nivel, puntos por categoría, actividad reciente),
tabla de progreso, botón para reiniciar el progreso y diseño responsive.

## Estructura

```
src/
├── App.jsx                  → estado principal (progreso, puntos, vista) y eventos
├── App.css / index.css      → estilos (paleta y fuentes)
├── data/retos.js            → bloques de preguntas y sus criterios
├── hooks/useLocalStorage.js → hook que guarda el estado en localStorage
├── utils/validar.js         → lógica de validación de cada tipo de pregunta
└── components/
    ├── Sidebar.jsx            → navegación lateral con el logo
    ├── Logo.jsx               → logo de Retoma (flecha en bucle con < >)
    ├── Encabezado.jsx         → título principal
    ├── Estadisticas.jsx       → bloques / completados / pendientes / % de avance
    ├── FiltroCategorias.jsx   → filtro por categoría
    ├── ListaBloques.jsx       → cuadrícula de tarjetas
    ├── TarjetaBloque.jsx      → tarjeta de cada bloque con su avance
    ├── DetalleBloque.jsx      → pantalla del bloque: pasos, pregunta actual y resumen
    ├── Pregunta.jsx           → una pregunta: respuesta, validación y pista
    ├── OpcionesRespuesta.jsx  → opciones A/B/C/D o Verdadero/Falso
    ├── EditorCodigo.jsx       → editor de código con números de línea
    ├── ResultadoValidacion.jsx→ lista de criterios cumplidos / no cumplidos
    ├── VistaProgreso.jsx      → tabla con el estado de todos los bloques
    ├── PanelJugador.jsx       → perfil, nivel y actividad
    └── Icono.jsx              → íconos SVG estilo sticker
```

## Ejecutar sin Docker

```bash
npm install
npm run dev
```

---

## Dockerización (con Docker Compose)

> Antes: abrir **Docker Desktop** y tener la cuenta de **Docker Hub**.
> En `compose.yaml` cambia `eniriel` por tu usuario de Docker Hub.

Todos los comandos se corren dentro de la carpeta `retos-app`.

**1. Verificar que Compose funciona**

```bash
docker compose version
```

**2. Construir la imagen y levantar el contenedor**

```bash
docker compose up --build
```

Abrir http://localhost:5173 → captura de pantalla como evidencia.
(Para dejarlo en segundo plano: `docker compose up -d --build`)

**3. Ver el contenedor corriendo** (otra evidencia)

```bash
docker compose ps
```

**4. Iniciar sesión en Docker Hub**

```bash
docker login
```

**5. Ver que la imagen existe con su versión**

```bash
docker images
```

Debe aparecer `eniriel/retos-app` con el tag `v1.0`.

**6. Subir la imagen a Docker Hub**

```bash
docker push eniriel/retos-app:v1.0
```

**7. Detener y eliminar el contenedor**

```bash
docker compose down
```

**8. (Opcional) Probar que la imagen publicada funciona**

```bash
docker pull eniriel/retos-app:v1.0
```

```bash
docker run -it --rm -p 5173:5173 eniriel/retos-app:v1.0
```

### Alternativa sin Compose (como en la guía 1)

```bash
docker build -t eniriel/retos-app:v1.0 .
```

```bash
docker run -it -p 5173:5173 eniriel/retos-app:v1.0
```

### Nueva versión (v1.1)

Cambiar el tag en `compose.yaml` a `v1.1`, luego `docker compose build` y
`docker push eniriel/retos-app:v1.1`.
