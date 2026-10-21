// Íconos estilo "sticker": trazo negro grueso con un borde blanco alrededor.
// Cada figura se dibuja dos veces: primero en blanco y más gruesa (el borde del sticker)
// y encima en color oscuro.

const FIGURAS = {
  llaves: (
    <>
      <path d="M18 9c-4 0-5 2-5 5v6c0 2-1 4-4 4 3 0 4 2 4 4v6c0 3 1 5 5 5" />
      <path d="M30 9c4 0 5 2 5 5v6c0 2 1 4 4 4-3 0-4 2-4 4v6c0 3-1 5-5 5" />
    </>
  ),
  codigo: (
    <>
      <path d="M16 15 7 24l9 9" />
      <path d="M32 15l9 9-9 9" />
      <path d="M27 11l-6 26" />
    </>
  ),
  foco: (
    <>
      <path d="M24 7c-7 0-12 5-12 11.5 0 4.5 2.5 7 4.5 9 1.5 1.5 2 3 2 5h11c0-2 .5-3.5 2-5 2-2 4.5-4.5 4.5-9C36 12 31 7 24 7z" />
      <path d="M19 37h10" />
      <path d="M21 41h6" />
      <path d="M19 17c1-2.5 3-4 5.5-4" />
    </>
  ),
  atomo: (
    <>
      <ellipse cx="24" cy="24" rx="17" ry="7" />
      <ellipse cx="24" cy="24" rx="17" ry="7" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="17" ry="7" transform="rotate(-60 24 24)" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </>
  ),
  barras: (
    <>
      <rect x="8" y="28" width="8" height="12" rx="2" />
      <rect x="20" y="20" width="8" height="20" rx="2" />
      <rect x="32" y="10" width="8" height="30" rx="2" />
    </>
  ),
  contenedores: (
    <>
      <rect x="9" y="20" width="9" height="8" rx="1.5" />
      <rect x="19.5" y="20" width="9" height="8" rx="1.5" />
      <rect x="30" y="20" width="9" height="8" rx="1.5" />
      <rect x="19.5" y="11" width="9" height="8" rx="1.5" />
      <path d="M5 30h38c-2 7-9 11-19 11S7 37 5 30z" />
    </>
  ),
  robot: (
    <>
      <path d="M24 8v5" />
      <path d="M5.5 21v7M42.5 21v7" />
      <rect x="9" y="13" width="30" height="23" rx="7" />
      <circle cx="24" cy="6.5" r="2" fill="currentColor" />
      <circle cx="18" cy="23" r="2.8" fill="currentColor" />
      <circle cx="30" cy="23" r="2.8" fill="currentColor" />
      <path d="M19 30h10" />
    </>
  ),
  enchufe: (
    <>
      <path d="M18 6v8M30 6v8" />
      <path d="M24 33v9" />
      <path d="M12 14h24v7c0 7-5 12-12 12s-12-5-12-12z" />
    </>
  ),
  celular: (
    <>
      <rect x="13" y="5" width="22" height="38" rx="5" />
      <path d="M21 37h6" />
      <path d="M20 13v16M29 13l-8 8 8 8" />
    </>
  ),
  casa: (
    <>
      <path d="M12 20v18h24V20" />
      <path d="M8 22 24 9l16 13" />
      <path d="M20 38V28h8v10" />
    </>
  ),
  cuadricula: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="3" />
      <rect x="27" y="8" width="13" height="13" rx="3" />
      <rect x="8" y="27" width="13" height="13" rx="3" />
      <rect x="27" y="27" width="13" height="13" rx="3" />
    </>
  ),
  trofeo: (
    <>
      <path d="M15 12H9c0 5 2.5 8 6.5 8.5" />
      <path d="M33 12h6c0 5-2.5 8-6.5 8.5" />
      <path d="M15 8h18v9c0 6-4 10-9 10s-9-4-9-10V8z" />
      <path d="M24 27v6" />
      <path d="M16 40h16l-2-7H18z" />
    </>
  ),
  estrella: <path d="M24 7l5 10.5 11.5 1.5-8.5 8 2 11.5L24 33l-10 5.5 2-11.5-8.5-8L19 17.5z" />,
  check: <path d="M10 25l9 9 19-20" />,
  equis: <path d="M13 13l22 22M35 13 13 35" />,
  atras: (
    <>
      <path d="M38 24H11" />
      <path d="M21 13 10 24l11 11" />
    </>
  ),
  siguiente: (
    <>
      <path d="M10 24h27" />
      <path d="M27 13l11 11-11 11" />
    </>
  ),
  reloj: (
    <>
      <path d="M16 7c0 8 8 11 8 17s-8 9-8 17h16c0-8-8-11-8-17s8-9 8-17z" />
      <path d="M13 7h22" />
      <path d="M13 41h22" />
      <path d="M19 38c1-3 3-4.5 5-4.5s4 1.5 5 4.5z" fill="currentColor" />
    </>
  ),
  lapiz: (
    <>
      <path d="M30 8l10 10-20 20-11 2 2-11z" />
      <path d="M26 12l10 10" />
      <path d="M11 29l8 8" />
    </>
  ),
  reiniciar: (
    <>
      <path d="M38 24a14 14 0 1 1-4.1-9.9" />
      <path d="M35 7v8h-8" />
    </>
  ),
  llama: (
    <>
      <path d="M24 41c-7.5 0-12-5-12-11 0-7 6-9.5 7-17 4.5 2.5 6 6.5 5.5 10 1.5-1 2.5-3 2.5-5.5C32 21 36 25 36 30c0 6-4.5 11-12 11z" />
      <path d="M24 41c-3 0-5-2-5-5 0-3.5 3-4.5 4-8 2.5 2 6 4.5 6 8 0 3-2 5-5 5z" />
    </>
  ),
  taza: (
    <>
      <path d="M32 18h3c3 0 5 2 5 5s-2 5-5 5h-3" />
      <path d="M10 14h22v18c0 4-3 7-7 7h-8c-4 0-7-3-7-7z" />
      <path d="M17 5c-1.5 2 1.5 3 0 5" />
      <path d="M25 5c-1.5 2 1.5 3 0 5" />
    </>
  ),
  calavera: (
    <>
      <path d="M24 7c-9 0-15 6-15 14 0 5 2.5 8.5 6 10v5c0 2 1.5 3 3 3h12c1.5 0 3-1 3-3v-5c3.5-1.5 6-5 6-10 0-8-6-14-15-14z" />
      <circle cx="18" cy="21" r="3.5" fill="currentColor" />
      <circle cx="30" cy="21" r="3.5" fill="currentColor" />
      <path d="M22 29l2-3 2 3" />
      <path d="M20 39v-4M24 39v-4M28 39v-4" />
    </>
  ),
  carita: (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M17 27c2 4 5 5.5 7 5.5s5-1.5 7-5.5" />
      <path d="M18.5 18.5v3.5" />
      <path d="M28 20.5h4.5" />
    </>
  ),
  cursor: (
    <>
      <path d="M14 13l21 9.5-8.5 2.5 6.5 9-4.5 3-6.5-9-5.5 6.5z" />
      <path d="M9 5.5l2 3.5M5.5 11.5H9M15.5 4v3.5" />
    </>
  ),
  ejecutar: (
    <>
      <rect x="8" y="8" width="32" height="32" rx="8" />
      <rect x="13" y="12" width="22" height="20" rx="4" />
      <path d="M21 17v10l8-5z" fill="currentColor" />
    </>
  ),
  usuario: (
    <>
      <circle cx="24" cy="17" r="8" />
      <path d="M9 40c1-8 7-12.5 15-12.5S38 32 39 40z" />
    </>
  ),
}

export default function Icono({ nombre, tamano = 28, className = '' }) {
  const figura = FIGURAS[nombre]
  if (!figura) return null

  return (
    <svg
      className={`icono ${className}`}
      width={tamano}
      height={tamano}
      viewBox="0 0 48 48"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Borde blanco del sticker */}
      <g color="#fff" stroke="#fff" strokeWidth="9" fill="#fff">
        {figura}
      </g>
      {/* Trazo principal */}
      <g stroke="currentColor" strokeWidth="3.4" fill="none">
        {figura}
      </g>
    </svg>
  )
}
