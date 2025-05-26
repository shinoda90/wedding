import Carousel from './Carousel'

export default function Location() {
  return (
    <>
      <div className="text-4xl font-bold mt-2 text-center font-slogan">
        Cardedeu,
      </div>
      <div className="text-2xl font-bold text-center font-slogan">
        Lago de Coatepeque
      </div>
      <div className="text-lg font-bold mb-10 mt-10 text-center text-neutral">
        Cardedeu Hotel, Calle Los Planes KM 2, Coatepeque, El Salvador
      </div>
      <Carousel />
      {/* dein iFrame */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.1500750906384!2d-89.53752012543902!3d13.889973194080554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62ddc405870ad9%3A0xfb4b357a32b68c47!2sCapilla%20del%20Hotel%20Cardedeu!5e0!3m2!1sde!2sch!4v1745673471837!5m2!1sde!2sch"
        className="w-full h-[300px] max-w-[1000px] mx-auto"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  )
}
