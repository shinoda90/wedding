import Logo from '../image/Logo_new.png'

export default function SectionDivider() {
  return (
    <div className="relative my-12 flex items-center justify-center">
      {/* Kürzere Linie links */}
      <div className="w-1/5 border-t border-neutral" />

      {/* Kleineres, leicht nach links versetztes Logo */}
      <div className="mx-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-10 w-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Kürzere Linie rechts */}
      <div className="w-1/5 border-t border-neutral" />
    </div>
  )
}
