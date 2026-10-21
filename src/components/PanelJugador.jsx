import { useState } from 'react'
import Icono from './Icono'

function iniciales(nombre) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('')
}

function horaCorta(fecha) {
  return new Date(fecha).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
}

export default function PanelJugador({
  jugador,
  onCambiarNombre,
  puntos,
  nivel,
  avanceNivel,
  puntosParaSubir,
  puntosPorCategoria,
  historial,
  onAbrir,
}) {
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState(jugador)

  function guardarNombre(evento) {
    evento.preventDefault()
    const limpio = borrador.trim()
    if (limpio) onCambiarNombre(limpio)
    else setBorrador(jugador)
    setEditando(false)
  }

  return (
    <aside className="panel">
      <section className="panel__perfil">
        <div className="avatar" aria-hidden="true">
          {iniciales(jugador) || <Icono nombre="usuario" tamano={36} />}
        </div>

        {editando ? (
          <form onSubmit={guardarNombre} className="panel__form">
            <input
              value={borrador}
              onChange={(e) => setBorrador(e.target.value)}
              maxLength={24}
              autoFocus
              aria-label="Nombre del jugador"
            />
            <button className="boton-circulo boton-circulo--chico" title="Guardar nombre">
              <Icono nombre="check" tamano={18} />
            </button>
          </form>
        ) : (
          <button className="panel__nombre" onClick={() => setEditando(true)} title="Cambiar nombre">
            {jugador} <Icono nombre="lapiz" tamano={18} />
          </button>
        )}

        <div className="panel__puntos">
          <Icono nombre="llama" tamano={34} />
          <strong>{puntos}</strong>
          <span>puntos</span>
        </div>

        <div className="nivel">
          <div className="nivel__texto">
            <span>Nivel {nivel}</span>
            <small>{puntosParaSubir} pts para subir</small>
          </div>
          <div className="barra barra--clara">
            <div className="barra__relleno" style={{ width: `${avanceNivel * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="panel__tarjeta">
        <h4>Puntos por categoría</h4>
        <ul className="categorias-barras">
          {puntosPorCategoria.map((categoria) => (
            <li key={categoria.id}>
              <div className="categorias-barras__texto">
                <span>
                  <Icono nombre={categoria.icono} tamano={18} /> {categoria.id}
                </span>
                <small>
                  {categoria.puntos}/{categoria.maximo}
                </small>
              </div>
              <div className="barra">
                <div
                  className={`barra__relleno relleno--${categoria.color}`}
                  style={{ width: `${(categoria.puntos / categoria.maximo) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel__tarjeta">
        <h4>Actividad reciente</h4>
        {historial.length === 0 ? (
          <p className="panel__vacio">
            <Icono nombre="cursor" tamano={28} /> Elige un bloque para empezar.
          </p>
        ) : (
          <ul className="historial">
            {historial.map((item) => (
              <li key={item.fecha}>
                <button onClick={() => onAbrir(item.id)}>
                  <Icono nombre={item.aprobado ? 'check' : 'equis'} tamano={18} />
                  <span className="historial__titulo">{item.titulo}</span>
                  <span className="historial__puntos">{item.puntos > 0 ? `+${item.puntos}` : horaCorta(item.fecha)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  )
}
