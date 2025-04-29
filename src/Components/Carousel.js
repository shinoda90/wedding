import Carousel1 from '../image/Carousel-1.webp'
import Carousel2 from '../image/Carousel-2.webp'
import Carousel3 from '../image/Carousel-3.webp'
import Carousel4 from '../image/Carousel-4.webp'

const images = [Carousel1, Carousel2, Carousel3, Carousel4]

export default function Carousel() {
  return (
    <div className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory mb-10 px-2 md:overflow-x-hidden max-w-[1000px] mx-auto">
      <div className="flex gap-4">
        {images.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-60 sm:w-64 snap-center">
            <img
              src={img}
              alt={`Carousel ${index + 1}`}
              className="rounded-xl w-full object-cover p-2"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
