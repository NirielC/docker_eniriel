import Icono from './Icono'

export default function ResultadoValidacion({ resultado }) {
  const { aprobado, criterios, puntosGanados, yaCompletado } = resultado
  const cumplidos = criterios.filter((c) => c.cumple).length

  let mensaje = 'Algunos criterios no se cumplen. Revisa y vuelve a intentarlo.'
  if (aprobado && puntosGanados > 0) mensaje = `¡Bien! Ganaste ${puntosGanados} puntos.`
  else if (aprobado && yaCompletado) mensaje = '¡Correcto! Esta pregunta ya estaba resuelta, así que no suma puntos.'

  return (
    <section className={`resultado ${aprobado ? 'resultado--aprobado' : 'resultado--fallido'}`} aria-live="polite">
      <div className="resultado__cabecera">
        <Icono nombre={aprobado ? 'carita' : 'calavera'} tamano={52} />
        <div>
          <h3>{aprobado ? 'Correcto' : 'Aún no'}</h3>
          <p>{mensaje}</p>
        </div>
        <span className="resultado__conteo">
          {cumplidos}/{criterios.length}
          <small>criterios</small>
        </span>
      </div>

      <ul className="criterios">
        {criterios.map((criterio, indice) => (
          <li key={indice} className={criterio.cumple ? 'cumple' : 'no-cumple'}>
            <Icono nombre={criterio.cumple ? 'check' : 'equis'} tamano={20} />
            <div>
              <code>{criterio.texto}</code>
              {criterio.detalle && <small>{criterio.detalle}</small>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
