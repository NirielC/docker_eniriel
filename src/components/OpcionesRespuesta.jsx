const LETRAS = ['A', 'B', 'C', 'D', 'E']

export default function OpcionesRespuesta({ opciones, seleccion, onSeleccionar, correcta, incorrecta, bloqueado }) {
  return (
    <div className="opciones" role="radiogroup">
      {opciones.map((opcion, indice) => {
        const clases = ['opcion']
        if (seleccion === indice) clases.push('seleccionada')
        if (correcta === indice) clases.push('correcta')
        if (incorrecta === indice) clases.push('incorrecta')

        return (
          <button
            type="button"
            key={opcion}
            role="radio"
            aria-checked={seleccion === indice}
            className={clases.join(' ')}
            onClick={() => onSeleccionar(indice)}
            disabled={bloqueado}
          >
            <span className="opcion__letra">{LETRAS[indice]}</span>
            <span>{opcion}</span>
          </button>
        )
      })}
    </div>
  )
}
