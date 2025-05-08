import Carousel1 from '../image/Carousel-1.webp'
import Carousel2 from '../image/Carousel-2.webp'
import Carousel3 from '../image/Carousel-3.webp'
import Carousel4 from '../image/Carousel-4.webp'

const images = [Carousel1, Carousel2, Carousel3, Carousel4]

export default function Carousel() {
  return (
    <div className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory mt-5 mb-16 md:overflow-x-hidden mx-auto max-w-[1000px]">
      <div className="flex gap-x-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-60 lg:w-[calc((100%-24px*3)/4)] snap-center"
          >
            <img
              src={img}
              alt={`Carousel ${index + 1}`}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
