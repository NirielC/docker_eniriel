// Logo de "Retoma": una flecha en bucle (volver a intentarlo) con un < > de código adentro.
export default function Logo({ tamano = 56 }) {
  return (
    <svg
      className="logo"
      width={tamano}
      height={tamano}
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Retoma"
    >
      <path d="M53 32a21 21 0 1 1-6.2-14.9" stroke="#96a6c5" strokeWidth="4.5" />
      <path d="M48.5 7.5v10.5H38" stroke="#96a6c5" strokeWidth="4.5" />
      <path d="M27 24l-8 8 8 8" stroke="#f7edc4" strokeWidth="4.5" />
      <path d="M37 24l8 8-8 8" stroke="#f7edc4" strokeWidth="4.5" />
    </svg>
  )
}
