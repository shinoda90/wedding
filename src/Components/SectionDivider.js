import Logo from '../image/Logo_new.png'

export default function SectionDivider() {
  return (
    <div className="relative my-12 flex items-center justify-center">
      <div className="w-1/4 border-t border-neutral" />

      {/* Kleineres, leicht nach links versetztes Logo */}
      <div className="mx-8">
        <img
          src={Logo}
          alt="Logo"
          className="h-10 w-auto object-contain"
          loading="lazy"
        />
      </div>

      <div className="w-1/4 border-t border-neutral" />
    </div>
  )
}
