// Lógica para validar la solución del usuario contra los criterios predefinidos de cada reto.
// Siempre devuelve el mismo formato:
//   { aprobado: true | false, criterios: [{ texto, cumple, detalle }] }

// Quita espacios extra, comillas y mayúsculas para comparar respuestas escritas
export function normalizar(texto) {
  return String(texto)
    .trim()
    .toLowerCase()
    .replace(/["'`;]/g, '')
    .replace(/\s+/g, ' ')
}

// Muestra un valor como texto legible: [1,2] -> "[1,2]", "hola" -> "\"hola\""
export function mostrarValor(valor) {
  if (valor === undefined) return 'undefined'
  return JSON.stringify(valor)
}

function validarOpcion(reto, seleccion) {
  const cumple = seleccion === reto.correcta
  return {
    aprobado: cumple,
    criterios: [
      {
        texto: 'Seleccionaste la opción correcta',
        cumple,
        detalle: cumple ? null : 'Esa no es la respuesta, inténtalo de nuevo.',
      },
    ],
  }
}

function validarRespuesta(reto, texto) {
  const escrita = normalizar(texto)
  const noVacia = escrita.length > 0
  const coincide = reto.respuestasValidas.some((valida) => normalizar(valida) === escrita)

  return {
    aprobado: noVacia && coincide,
    criterios: [
      { texto: 'La respuesta no está vacía', cumple: noVacia },
      {
        texto: 'La respuesta coincide con la esperada',
        cumple: coincide,
        detalle: coincide ? null : `Escribiste: "${texto.trim()}"`,
      },
    ],
  }
}

// Elimina los comentarios para que "map" escrito en un comentario no cuente
function quitarComentarios(codigo) {
  return codigo.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
}

function contienePalabra(codigo, palabra) {
  const escapada = palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escapada}\\b`).test(codigo)
}

function validarCodigo(reto, codigo) {
  const criterios = []
  const limpio = quitarComentarios(codigo)

  // 1. Convertir el texto en una función real con new Function
  let funcion = null
  try {
    const crear = new Function(
      `${codigo}\nreturn typeof ${reto.nombreFuncion} === 'function' ? ${reto.nombreFuncion} : null;`,
    )
    funcion = crear()
  } catch (error) {
    criterios.push({ texto: 'El código no tiene errores de sintaxis', cumple: false, detalle: error.message })
    return { aprobado: false, criterios }
  }

  criterios.push({
    texto: `Existe la función ${reto.nombreFuncion}`,
    cumple: funcion !== null,
    detalle: funcion ? null : 'Revisa que el nombre de la función sea exactamente igual.',
  })
  if (!funcion) return { aprobado: false, criterios }

  // 2. Palabras que el código DEBE usar
  for (const palabra of reto.requiere ?? []) {
    criterios.push({ texto: `Usa ${palabra}`, cumple: contienePalabra(limpio, palabra) })
  }

  // 3. Palabras que el código NO debe usar
  for (const palabra of reto.prohibe ?? []) {
    criterios.push({ texto: `No usa ${palabra}`, cumple: !contienePalabra(limpio, palabra) })
  }

  // 4. Ejecutar cada caso de prueba y comparar el resultado con el esperado
  for (const prueba of reto.pruebas) {
    const llamada = `${reto.nombreFuncion}(${prueba.entrada.map(mostrarValor).join(', ')})`
    try {
      // structuredClone evita que la función del usuario modifique los datos del reto
      const obtenido = funcion(...structuredClone(prueba.entrada))
      const cumple = mostrarValor(obtenido) === mostrarValor(prueba.esperado)
      criterios.push({
        texto: `${llamada} → ${mostrarValor(prueba.esperado)}`,
        cumple,
        detalle: cumple ? null : `Tu función devolvió ${mostrarValor(obtenido)}`,
      })
    } catch (error) {
      criterios.push({ texto: `${llamada} → ${mostrarValor(prueba.esperado)}`, cumple: false, detalle: error.message })
    }
  }

  return { aprobado: criterios.every((c) => c.cumple), criterios }
}

export function validarReto(reto, solucion) {
  // Verdadero o falso se valida igual que opción múltiple (2 opciones)
  if (reto.tipo === 'opcion' || reto.tipo === 'vf') return validarOpcion(reto, solucion)
  if (reto.tipo === 'respuesta') return validarRespuesta(reto, solucion)
  return validarCodigo(reto, solucion)
}
