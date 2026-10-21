export default function EditorCodigo({ codigo, onCambiar, onEjecutar, bloqueado }) {
  const lineas = codigo.split('\n').length

  function manejarTeclas(evento) {
    // Tab inserta 2 espacios en lugar de saltar al siguiente elemento
    if (evento.key === 'Tab') {
      evento.preventDefault()
      const { selectionStart, selectionEnd } = evento.target
      const nuevo = codigo.slice(0, selectionStart) + '  ' + codigo.slice(selectionEnd)
      onCambiar(nuevo)
      requestAnimationFrame(() => {
        evento.target.selectionStart = evento.target.selectionEnd = selectionStart + 2
      })
    }
    // Ctrl + Enter valida la solución
    if (evento.key === 'Enter' && (evento.ctrlKey || evento.metaKey)) {
      evento.preventDefault()
      onEjecutar()
    }
  }

  return (
    <div className="editor">
      <div className="editor__barra">
        <span className="puntos-ventana">
          <i />
          <i />
          <i />
        </span>
        <span>solucion.js</span>
        <span className="editor__atajo">Ctrl + Enter para validar</span>
      </div>
      <div className="editor__cuerpo">
        <div className="editor__lineas" aria-hidden="true">
          {Array.from({ length: lineas }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <textarea
          value={codigo}
          onChange={(e) => onCambiar(e.target.value)}
          onKeyDown={manejarTeclas}
          spellCheck="false"
          wrap="off"
          rows={Math.max(lineas, 8)}
          disabled={bloqueado}
          aria-label="Editor de código"
        />
      </div>
    </div>
  )
}
