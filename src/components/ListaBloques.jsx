import TarjetaBloque from './TarjetaBloque'
import Icono from './Icono'

export default function ListaBloques({ bloques, resumenDe, onAbrir }) {
  if (bloques.length === 0) {
    return (
      <div className="vacio">
        <Icono nombre="taza" tamano={56} />
        <p>No hay bloques en esta categoría todavía.</p>
      </div>
    )
  }

  return (
    <section className="lista-retos">
      {bloques.map((bloque) => (
        <TarjetaBloque key={bloque.id} bloque={bloque} resumen={resumenDe(bloque)} onAbrir={onAbrir} />
      ))}
    </section>
  )
}
