import { useState } from 'react'
import { CATEGORIAS } from '../data/retos'
import Icono from './Icono'
import Pregunta from './Pregunta'

export default function DetalleBloque({ bloque, resumen, estadoDe, onVolver, onValidar, onUsarPista, onSiguienteBloque }) {
  const categoria = CATEGORIAS.find((c) => c.id === bloque.categoria)
  const total = bloque.preguntas.length

  // Empieza en la primera pregunta sin resolver (o en la primera si ya están todas)
  const [indice, setIndice] = useState(() => {
    const pendiente = bloque.preguntas.findIndex((pregunta) => !estadoDe(pregunta.id).completado)
    return pendiente === -1 ? 0 : pendiente
  })
  const [verResumen, setVerResumen] = useState(false)

  const pregunta = bloque.preguntas[indice]

  function irAPregunta(nuevoIndice) {
    setIndice(nuevoIndice)
    setVerResumen(false)
  }

  // Después de responder bien decide a dónde ir
  function siguientePregunta(resultado) {
    const recienTerminado = resumen.completado && !resultado.yaCompletado
    const ultimaDelRepaso = resumen.completado && indice === total - 1
    if (recienTerminado || ultimaDelRepaso) {
      setVerResumen(true)
    } else if (resumen.completado) {
      setIndice(indice + 1) // repaso: avanza en orden
    } else {
      // va a la siguiente pregunta pendiente (o vuelve a la primera pendiente)
      const despues = bloque.preguntas.findIndex((p, i) => i > indice && !estadoDe(p.id).completado)
      const desdeElInicio = bloque.preguntas.findIndex((p) => !estadoDe(p.id).completado)
      setIndice(despues !== -1 ? despues : desdeElInicio)
    }
  }

  return (
    <article className={`detalle detalle--${categoria.color}`}>
      <div className="detalle__barra">
        <button className="boton-circulo" onClick={onVolver} title="Volver a los bloques">
          <Icono nombre="atras" tamano={24} />
        </button>
        <span className="chip">
          <Icono nombre={categoria.icono} tamano={20} /> {bloque.categoria}
        </span>
        <span className="chip">{bloque.dificultad}</span>
        <span className="insignia insignia--grande">
          <Icono nombre="estrella" tamano={18} /> {resumen.puntos}/{resumen.maximo} pts
        </span>
      </div>

      <header className="detalle__cabecera">
        <h2>{bloque.titulo}</h2>
        <p>{bloque.descripcion}</p>

        {/* Pasos del bloque: un círculo por pregunta */}
        <ol className="pasos" aria-label="Preguntas del bloque">
          {bloque.preguntas.map((p, i) => {
            const clases = ['paso']
            if (estadoDe(p.id).completado) clases.push('hecho')
            if (i === indice && !verResumen) clases.push('actual')
            return (
              <li key={p.id}>
                <button className={clases.join(' ')} onClick={() => irAPregunta(i)} title={`Pregunta ${i + 1}`}>
                  {estadoDe(p.id).completado ? <Icono nombre="check" tamano={18} /> : i + 1}
                </button>
              </li>
            )
          })}
        </ol>
      </header>

      {verResumen ? (
        <section className="resumen-bloque">
          <span className="sello sello--grande">
            <Icono nombre="check" tamano={40} />
            <small>superado</small>
          </span>
          <div>
            <h3>¡Bloque completado!</h3>
            <p>
              Respondiste las {total} preguntas y ganaste <strong>{resumen.puntos} de {resumen.maximo} puntos</strong>{' '}
              con {resumen.intentos} intentos en total.
            </p>
            <div className="detalle__acciones">
              <button className="boton boton--primario" onClick={onSiguienteBloque}>
                Siguiente bloque <Icono nombre="siguiente" tamano={22} />
              </button>
              <button className="boton" onClick={() => irAPregunta(0)}>
                <Icono nombre="reiniciar" tamano={20} /> Repasar el bloque
              </button>
            </div>
          </div>
        </section>
      ) : (
        // key hace que la pregunta se cree de cero al cambiar (se limpia la respuesta anterior)
        <Pregunta
          key={pregunta.id}
          pregunta={pregunta}
          numero={indice + 1}
          total={total}
          estado={estadoDe(pregunta.id)}
          onValidar={(solucion) => onValidar(bloque, pregunta, solucion)}
          onUsarPista={() => onUsarPista(pregunta)}
          bloqueCompleto={resumen.completado}
          esUltima={indice === total - 1}
          onSiguiente={siguientePregunta}
        />
      )}
    </article>
  )
}
