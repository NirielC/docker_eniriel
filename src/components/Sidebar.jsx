import Icono from './Icono'
import Logo from './Logo'

const OPCIONES = [
  { id: 'retos', icono: 'casa', texto: 'Retos' },
  { id: 'progreso', icono: 'trofeo', texto: 'Progreso' },
]

export default function Sidebar({ vista, onCambiarVista, onReiniciar }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo" title="Retoma">
        <Logo />
      </div>

      <nav className="sidebar__nav">
        {OPCIONES.map((opcion) => (
          <button
            key={opcion.id}
            className={`sidebar__boton ${vista === opcion.id ? 'activo' : ''}`}
            onClick={() => onCambiarVista(opcion.id)}
            title={opcion.texto}
          >
            <Icono nombre={opcion.icono} tamano={26} />
            <span>{opcion.texto}</span>
          </button>
        ))}
      </nav>

      <button className="sidebar__boton sidebar__reiniciar" onClick={onReiniciar} title="Reiniciar progreso">
        <Icono nombre="reiniciar" tamano={24} />
        <span>Reiniciar</span>
      </button>
    </aside>
  )
}
