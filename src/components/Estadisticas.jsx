import Icono from './Icono'

export default function Estadisticas({ total, completados, porcentaje, puntos, puntosPosibles }) {
  const tarjetas = [
    { icono: 'cuadricula', valor: total, texto: 'Bloques', clase: 'azul' },
    { icono: 'check', valor: completados, texto: 'Completados', clase: 'rosa' },
    { icono: 'reloj', valor: total - completados, texto: 'Pendientes', clase: 'punteada' },
  ]

  return (
    <section className="estadisticas">
      <div className="estadisticas__burbujas">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.texto} className={`burbuja burbuja--${tarjeta.clase}`}>
            <span className="burbuja__icono">
              <Icono nombre={tarjeta.icono} tamano={24} />
            </span>
            <strong>{tarjeta.valor}</strong>
            <small>{tarjeta.texto}</small>
          </div>
        ))}
      </div>

      <div className="estadisticas__avance">
        <div className="avance__numero">
          {porcentaje}
          <span>%</span>
        </div>
        <p>Preguntas respondidas</p>
        <div className="barra">
          <div className="barra__relleno" style={{ width: `${porcentaje}%` }} />
        </div>
        <p className="avance__puntos">
          <Icono nombre="estrella" tamano={20} /> {puntos} de {puntosPosibles} puntos
        </p>
      </div>
    </section>
  )
}
