import Title from '../Components/Title'
import { useTranslation } from 'react-i18next'

import arriveIcon from '../../src/icons/scheduleIcon1.svg'
import churchIcon from '../../src/icons/scheduleIcon2.svg'
import cakeIcon from '../../src/icons/scheduleIcon3.svg'
import gamesIcon from '../../src/icons/scheduleIcon4.svg'

const lake = [
  {
    link: 'https://www.airbnb.com/rooms/1242101891143887033?check_in=2025-12-27&check_out=2025-12-28&location=El%20Salvador&search_mode=regular_search&source_impression_id=p3_1744550969_P3SgLSvhrgkOa8yH&previous_page_section_name=1001&federated_search_id=8a09925d-70dc-4149-9d7b-90aef2859612',
    img: 'airbnb1',
    price: 553,
    persons: 13,
    rooms: 4,
  },
  {
    link: 'https://www.airbnb.com/rooms/836118849603265328?check_in=2025-12-27&check_out=2025-12-28&location=El%20Salvador&search_mode=regular_search&source_impression_id=p3_1744551222_P3KsgiXDK0X61aiK&previous_page_section_name=1001&federated_search_id=35fec474-c99f-430f-b2fd-43ed915eb999',
    img: 'airbnb2',
    price: 832,
    persons: 12,
    rooms: 4,
  },
  {
    link: 'https://www.airbnb.com/rooms/887812837395232334?check_in=2025-12-27&check_out=2025-12-28&location=El%20Salvador&search_mode=regular_search&source_impression_id=p3_1744551280_P3PuqVpE6sx4T184&previous_page_section_name=1001&federated_search_id=35fec474-c99f-430f-b2fd-43ed915eb999',
    img: 'airbnb3',
    price: 430,
    persons: 16,
    rooms: 4,
  },
  {
    link: 'https://www.airbnb.com/rooms/648785716202295411?adults=1&check_in=2025-12-27&check_out=2025-12-29&location=Lago%20de%20Coatepeque%2C%20El%20Salvador&search_mode=regular_search&source_impression_id=p3_1745942599_P3JKBqd1u6ZNNcYZ&previous_page_section_name=1001&federated_search_id=6ba8817f-8a62-4f17-8a9e-e3f5b708aee7',
    img: 'airbnb4',
    price: 291,
    persons: 10,
    rooms: 4,
  },
  {
    link: 'https://www.airbnb.com/rooms/36841980?adults=1&check_in=2025-12-27&check_out=2025-12-29&location=Lago%20de%20Coatepeque%2C%20El%20Salvador&search_mode=regular_search&source_impression_id=p3_1745942695_P3NrSwvaGdx4RsHn&previous_page_section_name=1001&federated_search_id=6ba8817f-8a62-4f17-8a9e-e3f5b708aee7',
    img: 'airbnb5',
    price: 312,
    persons: 9,
    rooms: 4,
  },
  {
    link: 'https://www.airbnb.com/rooms/1371209423941885099?adults=1&check_in=2025-12-27&check_out=2025-12-29&location=Lago%20de%20Coatepeque%2C%20El%20Salvador&search_mode=regular_search&source_impression_id=p3_1745942802_P35mIMKloI5ZUEA7&previous_page_section_name=1001&federated_search_id=55aa4ede-b4cb-4259-98cf-982c0c56d2e5',
    img: 'airbnb6',
    price: 276,
    persons: 4,
    rooms: 2,
  },
  {
    link: 'https://www.airbnb.com/rooms/22729959?adults=1&check_in=2025-12-27&check_out=2025-12-29&location=Lago%20de%20Coatepeque%2C%20El%20Salvador&search_mode=regular_search&source_impression_id=p3_1745942937_P3Wtw6T9yvp5MXp8&previous_page_section_name=1001&federated_search_id=c305f50f-b537-4c86-a8dd-1822a4e3b2c8',
    img: 'airbnb7',
    price: 267,
    persons: 8,
    rooms: 3,
  },
  {
    link: 'https://www.airbnb.com/rooms/1213325766220980487?adults=1&check_in=2025-12-27&check_out=2025-12-29&location=Lago%20de%20Coatepeque%2C%20El%20Salvador&search_mode=regular_search&source_impression_id=p3_1745942967_P3IGK6taOtIzvP6S&previous_page_section_name=1001&federated_search_id=c305f50f-b537-4c86-a8dd-1822a4e3b2c8',
    img: 'airbnb8',
    price: 255,
    persons: 10,
    rooms: 4,
  },
  {
    link: 'https://www.airbnb.com/rooms/660892418334316819?adults=1&check_in=2025-12-27&check_out=2025-12-29&location=Lago%20de%20Coatepeque%2C%20El%20Salvador&search_mode=regular_search&source_impression_id=p3_1745943140_P3XVBmEEh-aupcuG&previous_page_section_name=1001&federated_search_id=c305f50f-b537-4c86-a8dd-1822a4e3b2c8',
    img: 'airbnb9',
    price: 363,
    persons: 6,
    rooms: 2,
  },
]

const salvador = [
  {
    link: 'https://www.airbnb.com/rooms/969005556773045175?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 12',
    price: 61,
    persons: 3,
    rooms: 1,
  },
  {
    link: 'https://www.airbnb.com/rooms/1374986178908405491?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 13',
    price: 80,
    persons: 6,
    rooms: 3,
  },
  {
    link: 'https://www.airbnb.com/rooms/1349579329610755342?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 14',
    price: 78,
    persons: 4,
    rooms: 1,
  },
  {
    link: 'https://www.airbnb.com/rooms/1308810574509495959?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 15',
    price: 100,
    persons: 6,
    rooms: 3,
  },
  {
    link: 'https://www.airbnb.com/rooms/1172043605907778198?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 16',
    price: 75,
    persons: 6,
    rooms: 3,
  },
  {
    link: 'https://www.airbnb.com/rooms/1362517707461073205?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 17',
    price: 90,
    persons: 4,
    rooms: 2,
  },
  {
    link: 'https://www.airbnb.com/rooms/1304678298466667871?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 18',
    price: 50,
    persons: 2,
    rooms: 1,
  },
  {
    link: 'https://www.airbnb.com/rooms/953985349903046222?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 19',
    price: 100,
    persons: 6,
    rooms: 3,
  },
  {
    link: 'https://www.airbnb.com/rooms/1133774204602998891?adults=1&check_in=2025-12-26&check_out=2025-12-28',
    img: 'airbnb 20',
    price: 120,
    persons: 6,
    rooms: 3,
  },
  {
    link: 'https://www.booking.com/hotel/sv/hyatt-centric-las-cascadas-san-salvador.es.html?checkin=2025-12-21&checkout=2025-12-28',
    img: 'airbnb 21',
    price: 160,
    persons: 2,
    rooms: 1,
  },
  {
    link: 'https://www.booking.com/hotel/sv/sheraton-presidente-san-salvador.es.html?checkin=2025-12-21&checkout=2025-12-22',
    img: 'airbnb 22',
    price: 137,
    persons: 2,
    rooms: 1,
  },
  {
    link: 'https://www.booking.com/hotel/sv/courtyard-by-marriott-san-salvador.es.html?checkin=2025-12-21&checkout=2025-12-22',
    img: 'airbnb 23',
    price: 109,
    persons: 4,
    rooms: 1,
  },
  {
    link: 'https://www.booking.com/hotel/sv/cinco-b-amp-b.es.html?checkin=2025-12-21&checkout=2025-12-22',
    img: 'airbnb 24',
    price: 77,
    persons: 2,
    rooms: 1,
  },
]

const mustSees = [
  {
    name: 'Suchitoto',
    description:
      'Kolonialstadt mit Kunst, Kultur und Blick auf den Suchitlán-See.',
    image: '/images/mustsees/suchitoto.webp',
  },
  {
    name: 'Ruta de las Flores',
    description: 'Bergdörfer mit Kaffee, Street Food und Wasserfällen.',
    image: '/images/mustsees/ruta_de_las_flores.webp',
  },
  {
    name: 'Santa Ana Vulkan',
    description:
      'Wanderung zu einem aktiven Vulkan mit türkisfarbenem Kratersee.',
    image: '/images/mustsees/santa_ana_vulkan.webp',
  },
  {
    name: 'El Tunco',
    description: 'Surf-Ort mit Sonnenuntergängen und schwarzem Sandstrand.',
    image: '/images/mustsees/el_tunco.webp',
  },
  {
    name: 'Joya de Cerén',
    description: 'UNESCO-Weltkulturerbe – erhaltenes präkolumbianisches Dorf.',
    image: '/images/mustsees/joya_de_ceren.webp',
  },
  {
    name: 'Tazumal',
    description: 'Größte Maya-Ruine El Salvadors mit eindrucksvoller Pyramide.',
    image: '/images/mustsees/tazumal.webp',
  },
  {
    name: 'Cerro Verde Nationalpark',
    description: 'Wandern mit Ausblick auf drei Vulkane in üppiger Natur.',
    image: '/images/mustsees/cerro_verde.webp',
  },
  {
    name: 'Playa El Zonte',
    description: 'Ruhiger Surfspot und Teil der Bitcoin Beach-Initiative.',
    image: '/images/mustsees/el_zonte.webp',
  },
  {
    name: 'Lago de Coatepeque',
    description:
      'Türkisblauer Kratersee, perfekt zum Schwimmen und Entspannen.',
    image: '/images/mustsees/lago_de_coatepeque.webp',
  },
  {
    name: 'San Salvador',
    description: 'Hauptstadt mit Museen, Street Art und moderner Architektur.',
    image: '/images/mustsees/san_salvador.webp',
  },
  {
    name: 'Puerta del Diablo',
    description:
      'Aussichtspunkt mit spektakulären Felsformationen und Blick über das Land.',
    image: '/images/mustsees/puerta_del_diablo.webp',
  },
  {
    name: 'Bahía de Jiquilisco',
    description:
      'Größte Küstenbucht El Salvadors mit Mangroven, Delfinen und Kajakmöglichkeiten.',
    image: '/images/mustsees/Bahia-de-Jiquilisco.webp',
  },
]

export default function Guide() {
  const { t } = useTranslation()
  const rentalCards = [
    {
      title: t('guide.rental1'),
      description: t('guide.rentalDescr1'),
    },
    {
      title: t('guide.rental2'),
      description: t('guide.rentalDescr2'),
    },
    {
      title: t('guide.rental3'),
      description: t('guide.rentalDescr3'),
    },
    {
      title: t('guide.rental4'),
      description: t('guide.rentalDescr4'),
      links: [
        {
          href: 'https://www.billiger-mietwagen.de',
          label: 'billiger-mietwagen.de',
        },
        {
          href: 'https://www.kayak.com',
          label: 'kayak.com',
        },
      ],
    },
  ]

  const icons = [arriveIcon, churchIcon, cakeIcon, gamesIcon]

  return (
    <div className="pt-10 px-4 max-w-6xl mx-auto">
      <Title title={t('navbar.guide')} />
      <img
        src="/images/flowers.png"
        alt="Flowers"
        className="block md:hidden absolute top-16 left-[-0%] h-12 pointer-events-none z-0"
      />
      <section className="mb-8">
        <div className="text-4xl font-bold my-8 text-center font-slogan mt-16">
          {t('guide.title4')}
        </div>

        <>
          {/* Mobile Version */}
          <div className="block md:hidden pl-2 pr-8 mt-8 -mx-4">
            <ul className="flex flex-col gap-8">
              {icons.map((iconSrc, index) => (
                <li key={index} className="flex items-start gap-2 relative">
                  {/* Vertikale Linie */}

                  <div className="absolute left-5 top-0 bottom-[-2rem] flex justify-center">
                    <div className="w-0.5 bg-secondary h-full"></div>
                  </div>

                  {/* Icon linke Spalte */}
                  <div className="w-10 flex-shrink-0 flex justify-center relative z-10">
                    <img
                      src={iconSrc}
                      alt={`icon-${index}`}
                      className=" h-10 rounded-full shadow-md -mt-2 top-0 p-1 bg-white"
                    />
                  </div>

                  {/* Text rechte Spalte */}
                  <div>
                    <time className="block font-tl-time mb-1">
                      {t(`guide.time${index + 1}`)}
                    </time>
                    <div className="text-lg font-tl-title">
                      {t(`guide.location${index + 1}`)}
                    </div>
                    <p className="font-tl-text">
                      {t(`guide.plan${index + 1}`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Version */}
          <div className="hidden md:block mt-12 max-w-[1000px] mx-auto mb-12">
            <ul className="grid grid-cols-[1fr_auto_1fr] gap-x-2 gap-y-6">
              {icons.map((iconSrc, index) => (
                <li key={index} className="contents">
                  {/* Linker Text oder leer */}
                  {index % 2 === 0 ? (
                    <div className="flex justify-end text-end pr-4">
                      <div>
                        <time className="block font-tl-time mb-1">
                          {t(`guide.time${index + 1}`)}
                        </time>
                        <div className="text-lg font-tl-title">
                          {t(`guide.location${index + 1}`)}
                        </div>
                        <p className="font-tl-text text-justify">
                          {t(`guide.plan${index + 1}`)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="w-12 relative flex justify-center">
                    {/* Vertikale Linie */}

                    <div className="absolute top-0 -bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-secondary"></div>

                    {/* Icon */}
                    {/* Icon */}
                    <img
                      src={iconSrc}
                      alt={`icon-${index}`}
                      className="absolute h-12 rounded-full shadow-md -mt-3 top-0 p-1 bg-white"
                    />
                  </div>

                  {/* Rechter Text oder leer */}
                  {index % 2 !== 0 ? (
                    <div className="flex justify-start text-start pl-4">
                      <div>
                        <time className="block font-tl-time mb-1">
                          {t(`guide.time${index + 1}`)}
                        </time>
                        <div className="text-lg font-tl-title">
                          {t(`guide.location${index + 1}`)}
                        </div>
                        <p className="font-tl-text text-justify">
                          {t(`guide.plan${index + 1}`)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-[800px] mx-auto grid md:grid-cols-3 gap-6 mt-12 mb-12 px-4 text-white">
            {[5, 6, 7].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-neutral shadow-md p-6 flex flex-col items-start justify-start gap-2 border border-navbar"
              >
                <div className="text-lg font-semibold">
                  {t(`guide.location${n}`)}
                </div>
                <p className="text-sm text-justify">{t(`guide.plan${n}`)}</p>
              </div>
            ))}
          </div>
        </>
      </section>
      <section className="mb-8 ">
        <div className="text-4xl font-bold my-8 text-center font-slogan mt-16">
          {t('guide.title2')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {mustSees.map((place, i) => (
            <div
              key={i}
              className="border p-3 rounded shadow bg-white text-neutral"
            >
              <img
                src={place.image}
                alt={place.name}
                className="mb-2 w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{place.name}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="text-4xl font-bold my-8 text-center font-slogan">
          {t('guide.title1')}
        </div>
        <div className="text-2xl font-bold my-6 mt-10 text-center text-neutral">
          Lago de Coatepeque
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lake.map((a, i) => (
            <div
              key={i}
              className="border rounded shadow overflow-hidden relative"
            >
              <div className="relative h-64">
                {' '}
                {/* feste Höhe für Bildcontainer */}
                <img
                  src={`/images/hotels/${a.img}.webp`}
                  alt={a.img}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 text-sm rounded p-2 shadow-lg text-right">
                  <p className="font-semibold text-gray-800">{a.price} €</p>
                  <p>
                    {a.rooms} {t('guide.rooms')}
                  </p>
                  <p>
                    {a.persons} {t('guide.persons')}
                  </p>
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-2xl font-bold my-6 mt-16 text-center text-neutral">
          San Salvador
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {salvador.map((a, i) => (
            <div
              key={i}
              className="border rounded shadow overflow-hidden relative"
            >
              <div className="relative h-64">
                {' '}
                {/* feste Höhe für Bildcontainer */}
                <img
                  src={`/images/hotels/${a.img}.webp`}
                  alt={a.img}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 text-sm rounded p-2 shadow-lg text-right">
                  <p className="font-semibold text-gray-800">{a.price} €</p>
                  <p>
                    {a.rooms} {t('guide.rooms')}
                  </p>
                  <p>
                    {a.persons} {t('guide.persons')}
                  </p>
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 px-4 max-w-5xl mx-auto">
        {/* Titel */}
        <div className="text-4xl font-bold text-center font-slogan mb-12 mt-20">
          {t('guide.title3')}
        </div>

        {/* Intro-Text */}
        <p className="mb-8 text-lg leading-relaxed text-center">
          {t('guide.intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rentalCards.map((card, index) => (
            <div
              key={index}
              className="bg-neutral text-white shadow-md rounded-2xl p-6 border border-navbar"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-base leading-relaxed mb-4">
                {card.description}
              </p>
              {card.links && (
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  {card.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Abschlusssatz */}
        <p className="mt-10 text-lg leading-relaxed text-center">
          {t('guide.extro')}
        </p>
      </section>
    </div>
  )
}
