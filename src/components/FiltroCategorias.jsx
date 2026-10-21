import { CATEGORIAS } from '../data/retos'
import Icono from './Icono'

export default function FiltroCategorias({ filtro, onCambiar, bloques }) {
  const opciones = [{ id: 'Todos', icono: 'cuadricula' }, ...CATEGORIAS]

  return (
    <div className="filtros" role="tablist" aria-label="Filtrar por categoría">
      {opciones.map((opcion) => {
        const cantidad =
          opcion.id === 'Todos' ? bloques.length : bloques.filter((bloque) => bloque.categoria === opcion.id).length

        return (
          <button
            key={opcion.id}
            role="tab"
            aria-selected={filtro === opcion.id}
            className={`filtro ${filtro === opcion.id ? 'activo' : ''}`}
            onClick={() => onCambiar(opcion.id)}
          >
            <span className="filtro__icono">
              <Icono nombre={opcion.icono} tamano={22} />
            </span>
            {opcion.id}
            <span className="filtro__cantidad">{cantidad}</span>
          </button>
        )
      })}
    </div>
  )
}
