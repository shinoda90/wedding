export default function Title({ title }) {
  return (
    <div className="relative text-center lg:text-6xl text-5xl m-5 font-titles mt-12">
      {/* Nur auf mobilen Geräten sichtbar */}
      <img
        src="/images/flowers.png"
        alt="Flowers"
        className="block md:hidden absolute left-[-15%] -top-5 h-full object-contain pointer-events-none z-[-1]"
      />
      {title}
    </div>
  )
}
