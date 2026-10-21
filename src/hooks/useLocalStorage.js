import { useEffect, useState } from 'react'

// Hook personalizado: funciona igual que useState, pero además guarda el valor
// en localStorage para que no se pierda al recargar la página.
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave)
      return guardado ? JSON.parse(guardado) : valorInicial
    } catch {
      return valorInicial
    }
  })

  // Cada vez que cambia el valor, se vuelve a guardar
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      // Si el navegador bloquea localStorage, la app sigue funcionando sin guardar
    }
  }, [clave, valor])

  return [valor, setValor]
}
