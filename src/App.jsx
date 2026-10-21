import { useState } from 'react'
import './App.css'
import { BLOQUES, CATEGORIAS, costoPista } from './data/retos'
import { useLocalStorage } from './hooks/useLocalStorage'
import { validarReto } from './utils/validar'
import Sidebar from './components/Sidebar'
import Encabezado from './components/Encabezado'
import Estadisticas from './components/Estadisticas'
import FiltroCategorias from './components/FiltroCategorias'
import ListaBloques from './components/ListaBloques'
import DetalleBloque from './components/DetalleBloque'
import VistaProgreso from './components/VistaProgreso'
import PanelJugador from './components/PanelJugador'

const PUNTOS_POR_NIVEL = 50
const ESTADO_INICIAL = { completado: false, puntos: 0, intentos: 0, usoPista: false }
const TODAS_LAS_PREGUNTAS = BLOQUES.flatMap((bloque) => bloque.preguntas)

export default function App() {
  // Se guarda en localStorage. progreso = { [idPregunta]: { completado, puntos, intentos, usoPista } }
  const [progreso, setProgreso] = useLocalStorage('retoma-progreso', {})
  const [historial, setHistorial] = useLocalStorage('retoma-historial', [])
  const [jugador, setJugador] = useLocalStorage('retoma-jugador', 'Programador')

  const [vista, setVista] = useState('retos') // 'retos' | 'progreso'
  const [bloqueActivoId, setBloqueActivoId] = useState(null)
  const [filtro, setFiltro] = useState('Todos')

  // ----- Datos calculados a partir del progreso -----
  const estadoDe = (idPregunta) => progreso[idPregunta] ?? ESTADO_INICIAL

  const resumenDe = (bloque) => {
    const estados = bloque.preguntas.map((pregunta) => estadoDe(pregunta.id))
    const resueltas = estados.filter((estado) => estado.completado).length
    return {
      resueltas,
      total: bloque.preguntas.length,
      completado: resueltas === bloque.preguntas.length,
      puntos: estados.reduce((suma, estado) => suma + estado.puntos, 0),
      maximo: bloque.preguntas.reduce((suma, pregunta) => suma + pregunta.puntos, 0),
      intentos: estados.reduce((suma, estado) => suma + estado.intentos, 0),
    }
  }

  const bloquesCompletados = BLOQUES.filter((bloque) => resumenDe(bloque).completado).length
  const preguntasResueltas = TODAS_LAS_PREGUNTAS.filter((pregunta) => estadoDe(pregunta.id).completado).length
  const porcentaje = Math.round((preguntasResueltas / TODAS_LAS_PREGUNTAS.length) * 100)
  const puntosTotales = TODAS_LAS_PREGUNTAS.reduce((suma, pregunta) => suma + estadoDe(pregunta.id).puntos, 0)
  const puntosPosibles = TODAS_LAS_PREGUNTAS.reduce((suma, pregunta) => suma + pregunta.puntos, 0)
  const nivel = Math.floor(puntosTotales / PUNTOS_POR_NIVEL) + 1

  const puntosPorCategoria = CATEGORIAS.map((categoria) => {
    const resumenes = BLOQUES.filter((bloque) => bloque.categoria === categoria.id).map(resumenDe)
    return {
      ...categoria,
      puntos: resumenes.reduce((suma, resumen) => suma + resumen.puntos, 0),
      maximo: resumenes.reduce((suma, resumen) => suma + resumen.maximo, 0),
    }
  })

  const bloquesFiltrados = filtro === 'Todos' ? BLOQUES : BLOQUES.filter((bloque) => bloque.categoria === filtro)
  const bloqueActivo = BLOQUES.find((bloque) => bloque.id === bloqueActivoId)

  // ----- Eventos -----
  function abrirBloque(id) {
    setBloqueActivoId(id)
    setVista('retos')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function usarPista(pregunta) {
    setProgreso((prev) => ({ ...prev, [pregunta.id]: { ...estadoDe(pregunta.id), usoPista: true } }))
  }

  // Valida la respuesta, suma los puntos y devuelve el resultado a la pregunta
  function validar(bloque, pregunta, solucion) {
    const resultado = validarReto(pregunta, solucion)
    const actual = estadoDe(pregunta.id)

    // Los puntos solo se suman la primera vez que se resuelve la pregunta
    const puntosGanados =
      resultado.aprobado && !actual.completado
        ? pregunta.puntos - (actual.usoPista ? costoPista(pregunta) : 0)
        : 0

    setProgreso((prev) => ({
      ...prev,
      [pregunta.id]: {
        ...actual,
        completado: actual.completado || resultado.aprobado,
        puntos: actual.puntos + puntosGanados,
        intentos: actual.intentos + 1,
      },
    }))

    const numero = bloque.preguntas.indexOf(pregunta) + 1
    setHistorial((prev) =>
      [
        { id: bloque.id, titulo: `${bloque.titulo} · P${numero}`, aprobado: resultado.aprobado, puntos: puntosGanados, fecha: Date.now() },
        ...prev,
      ].slice(0, 6),
    )

    return { ...resultado, puntosGanados, yaCompletado: actual.completado }
  }

  function siguienteBloque() {
    const pendiente = BLOQUES.find((bloque) => bloque.id !== bloqueActivoId && !resumenDe(bloque).completado)
    if (pendiente) abrirBloque(pendiente.id)
    else setBloqueActivoId(null)
  }

  function reiniciarProgreso() {
    if (!window.confirm('¿Seguro que quieres borrar todo tu progreso y puntos?')) return
    setProgreso({})
    setHistorial([])
    setBloqueActivoId(null)
  }

  function cambiarVista(nuevaVista) {
    setVista(nuevaVista)
    setBloqueActivoId(null)
  }

  return (
    <div className="app">
      <Sidebar vista={bloqueActivo ? 'bloque' : vista} onCambiarVista={cambiarVista} onReiniciar={reiniciarProgreso} />

      <main className="principal">
        {bloqueActivo ? (
          // key hace que React cree el componente de cero al cambiar de bloque (se limpia su estado)
          <DetalleBloque
            key={bloqueActivo.id}
            bloque={bloqueActivo}
            resumen={resumenDe(bloqueActivo)}
            estadoDe={estadoDe}
            onVolver={() => setBloqueActivoId(null)}
            onValidar={validar}
            onUsarPista={usarPista}
            onSiguienteBloque={siguienteBloque}
          />
        ) : vista === 'progreso' ? (
          <VistaProgreso bloques={BLOQUES} resumenDe={resumenDe} onAbrir={abrirBloque} />
        ) : (
          <>
            <Encabezado jugador={jugador} />
            <Estadisticas
              total={BLOQUES.length}
              completados={bloquesCompletados}
              porcentaje={porcentaje}
              puntos={puntosTotales}
              puntosPosibles={puntosPosibles}
            />
            <FiltroCategorias filtro={filtro} onCambiar={setFiltro} bloques={BLOQUES} />
            <ListaBloques bloques={bloquesFiltrados} resumenDe={resumenDe} onAbrir={abrirBloque} />
          </>
        )}
      </main>

      <PanelJugador
        jugador={jugador}
        onCambiarNombre={setJugador}
        puntos={puntosTotales}
        nivel={nivel}
        avanceNivel={(puntosTotales % PUNTOS_POR_NIVEL) / PUNTOS_POR_NIVEL}
        puntosParaSubir={PUNTOS_POR_NIVEL - (puntosTotales % PUNTOS_POR_NIVEL)}
        puntosPorCategoria={puntosPorCategoria}
        historial={historial}
        onAbrir={abrirBloque}
      />
    </div>
  )
}
