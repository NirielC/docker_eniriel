import { CATEGORIAS } from '../data/retos'
import Icono from './Icono'

export default function VistaProgreso({ bloques, resumenDe, onAbrir }) {
  return (
    <section className="progreso">
      <header className="encabezado">
        <p className="encabezado__saludo">
          Tu recorrido <Icono nombre="trofeo" tamano={22} />
        </p>
        <h1 className="encabezado__titulo encabezado__titulo--mediano">
          Tabla de <em>progreso</em>
        </h1>
      </header>

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Bloque</th>
              <th>Categoría</th>
              <th>Preguntas</th>
              <th>Intentos</th>
              <th>Puntos</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {bloques.map((bloque) => {
              const resumen = resumenDe(bloque)
              const categoria = CATEGORIAS.find((c) => c.id === bloque.categoria)
              return (
                <tr key={bloque.id} onClick={() => onAbrir(bloque.id)}>
                  <td className="tabla__reto">{bloque.titulo}</td>
                  <td>
                    <span className={`punto punto--${categoria.color}`} /> {bloque.categoria}
                  </td>
                  <td>
                    {resumen.resueltas}/{resumen.total}
                  </td>
                  <td>{resumen.intentos}</td>
                  <td>
                    {resumen.puntos}/{resumen.maximo}
                  </td>
                  <td>
                    {resumen.completado ? (
                      <span className="estado estado--ok">
                        <Icono nombre="check" tamano={16} /> Superado
                      </span>
                    ) : (
                      <span className="estado">{resumen.intentos > 0 ? 'En curso' : 'Pendiente'}</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
