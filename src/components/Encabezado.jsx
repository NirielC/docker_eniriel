import Icono from './Icono'

export default function Encabezado({ jugador }) {
  return (
    <header className="encabezado">
      <div className="encabezado__fila">
        <p className="marca">
          RE<em>to</em>MA
        </p>
        <p className="encabezado__saludo">
          Hola, {jugador} <Icono nombre="carita" tamano={22} />
        </p>
      </div>
      <h1 className="encabezado__titulo">
        Resuelve, suma
        <br />y <em>retoma</em>
      </h1>
      <p className="encabezado__texto">
        Bloques de retos de programación: elige respuestas, escribe soluciones y acumula puntos. Tu avance
        se guarda para que siempre retomes donde lo dejaste.
      </p>
    </header>
  )
}
