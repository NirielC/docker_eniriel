import { CATEGORIAS, DIFICULTADES } from '../data/retos'
import Icono from './Icono'

export default function TarjetaBloque({ bloque, resumen, onAbrir }) {
  const categoria = CATEGORIAS.find((c) => c.id === bloque.categoria)
  const nivelDificultad = DIFICULTADES[bloque.dificultad]

  return (
    <button
      className={`tarjeta tarjeta--${categoria.color} ${resumen.completado ? 'tarjeta--resuelta' : ''}`}
      onClick={() => onAbrir(bloque.id)}
    >
      <div className="tarjeta__arriba">
        <span className="tarjeta__categoria">
          <span className="circulo">
            <Icono nombre={categoria.icono} tamano={22} />
          </span>
          {bloque.categoria}
        </span>
        <span className="insignia">
          <Icono nombre="estrella" tamano={16} /> {resumen.maximo} pts
        </span>
      </div>

      <div>
        <h3 className="tarjeta__titulo">{bloque.titulo}</h3>
        <p className="tarjeta__descripcion">{bloque.descripcion}</p>
      </div>

      <div className="tarjeta__abajo">
        <span>
          {resumen.resueltas}/{resumen.total} preguntas
        </span>
        <span className="dificultad" title={`Dificultad ${bloque.dificultad}`}>
          {[1, 2, 3].map((punto) => (
            <i key={punto} className={punto <= nivelDificultad ? 'lleno' : ''} />
          ))}
          {bloque.dificultad}
        </span>
      </div>
      <div className="tarjeta__barra">
        <div style={{ width: `${(resumen.resueltas / resumen.total) * 100}%` }} />
      </div>

      {resumen.completado && (
        <span className="sello" aria-label="Bloque superado">
          <Icono nombre="check" tamano={26} />
          <small>superado</small>
        </span>
      )}
    </button>
  )
}
