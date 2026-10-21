import { useState } from 'react'
import { costoPista, TIPOS } from '../data/retos'
import Icono from './Icono'
import OpcionesRespuesta from './OpcionesRespuesta'
import EditorCodigo from './EditorCodigo'
import ResultadoValidacion from './ResultadoValidacion'

export default function Pregunta({ pregunta, numero, total, estado, bloqueCompleto, esUltima, onValidar, onUsarPista, onSiguiente }) {
  // Estado local: la respuesta que el usuario está construyendo
  const [seleccion, setSeleccion] = useState(null) // opción múltiple y verdadero/falso
  const [texto, setTexto] = useState('') // respuesta corta
  const [codigo, setCodigo] = useState(pregunta.plantilla ?? '') // código
  const [resultado, setResultado] = useState(null)

  const conOpciones = pregunta.tipo === 'opcion' || pregunta.tipo === 'vf'
  const solucion = conOpciones ? seleccion : pregunta.tipo === 'respuesta' ? texto : codigo
  const puedeValidar = conOpciones ? seleccion !== null : String(solucion).trim() !== ''
  const resuelto = resultado?.aprobado
  const mostrarResumen = bloqueCompleto && (!resultado?.yaCompletado || esUltima)

  function manejarValidar(evento) {
    evento?.preventDefault()
    if (!puedeValidar || resuelto) return
    setResultado(onValidar(solucion))
  }

  // Al cambiar la respuesta se oculta el resultado anterior
  function cambiarRespuesta(setter) {
    return (valor) => {
      setter(valor)
      if (resultado && !resultado.aprobado) setResultado(null)
    }
  }

  return (
    <section className="pregunta">
      <div className="pregunta__meta">
        <span className="pregunta__numero">
          Pregunta {numero} <small>de {total}</small>
        </span>
        <span className="chip">{TIPOS[pregunta.tipo]}</span>
        <span className="chip">
          <Icono nombre="estrella" tamano={16} /> {pregunta.puntos} pts
        </span>
      </div>

      <h3 className={`pregunta__enunciado ${pregunta.enunciado.length > 90 ? 'pregunta__enunciado--largo' : ''}`}>
        {pregunta.enunciado}
      </h3>
      {pregunta.codigo && <pre className="fragmento">{pregunta.codigo}</pre>}
      {estado.completado && !resultado && (
        <p className="aviso">
          <Icono nombre="check" tamano={18} /> Ya la respondiste bien. Puedes repasarla, pero no suma puntos otra vez.
        </p>
      )}

      <form className="detalle__respuesta" onSubmit={manejarValidar}>
        {conOpciones && (
          <OpcionesRespuesta
            opciones={pregunta.opciones}
            seleccion={seleccion}
            onSeleccionar={cambiarRespuesta(setSeleccion)}
            correcta={resuelto ? pregunta.correcta : null}
            incorrecta={resultado && !resultado.aprobado ? seleccion : null}
            bloqueado={resuelto}
          />
        )}

        {pregunta.tipo === 'respuesta' && (
          <label className="campo">
            <span>Tu respuesta</span>
            <input
              type="text"
              value={texto}
              onChange={(e) => cambiarRespuesta(setTexto)(e.target.value)}
              placeholder="Escribe aquí..."
              disabled={resuelto}
              autoFocus
            />
          </label>
        )}

        {pregunta.tipo === 'codigo' && (
          <EditorCodigo
            codigo={codigo}
            onCambiar={cambiarRespuesta(setCodigo)}
            onEjecutar={manejarValidar}
            bloqueado={resuelto}
          />
        )}

        <div className="detalle__acciones">
          {!resuelto ? (
            <button type="submit" className="boton boton--primario" disabled={!puedeValidar}>
              <Icono nombre="ejecutar" tamano={24} /> Validar respuesta
            </button>
          ) : (
            <button type="button" className="boton boton--primario" onClick={() => onSiguiente(resultado)} autoFocus>
              {mostrarResumen ? 'Ver resumen' : 'Siguiente pregunta'} <Icono nombre="siguiente" tamano={22} />
            </button>
          )}

          {pregunta.tipo === 'codigo' && !resuelto && (
            <button type="button" className="boton" onClick={() => cambiarRespuesta(setCodigo)(pregunta.plantilla)}>
              <Icono nombre="reiniciar" tamano={20} /> Reiniciar código
            </button>
          )}

          {!estado.usoPista ? (
            <button type="button" className="boton boton--pista" onClick={onUsarPista}>
              <Icono nombre="foco" tamano={22} /> Ver pista {!estado.completado && `(−${costoPista(pregunta)} pts)`}
            </button>
          ) : (
            <p className="pista">
              <Icono nombre="foco" tamano={22} />
              <span>{pregunta.pista}</span>
            </p>
          )}
        </div>
      </form>

      {resultado && <ResultadoValidacion resultado={resultado} />}
    </section>
  )
}
