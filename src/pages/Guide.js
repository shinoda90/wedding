import Title from '../Components/Title'
import { useTranslation } from 'react-i18next'

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
    image: '/images/mustsees/bahia_de_jiquilisco.webp',
  },
]

const accommodations = [
  {
    name: 'Hotel Boutique X',
    link: 'https://hotelboutiquex.com',
    people: 2,
    rooms: 1,
    address: 'Calle Falsa 123, San José',
    image: 'https://example.com/hotel-x.jpg',
  },
  {
    name: 'Villa Alegría',
    link: 'https://villaalegria.com',
    people: 4,
    rooms: 2,
    address: 'Ruta del Sol 45, Alajuela',
    image: 'https://example.com/villa-alegria.jpg',
  },
  // Weitere Unterkünfte hier
]

const mustSee = [
  {
    name: 'Vulkan Poás',
    address: 'Parque Nacional Volcán Poás',
    image: 'https://example.com/poas.jpg',
    description:
      'Ein beeindruckender aktiver Vulkan mit einer der größten Krateröffnungen der Welt. Früh am Morgen besuchen!',
  },
  {
    name: 'La Paz Waterfall Gardens',
    address: 'Vara Blanca, Heredia',
    image: 'https://example.com/lapaz.jpg',
    description:
      'Naturpark mit Wasserfällen, Wildtieren und einem Schmetterlingsgarten – ideal für Familien und Fotofans.',
  },
  // Weitere Sehenswürdigkeiten hier
]

export default function Guide() {
  const { t } = useTranslation()

  const guidePlans = [
    t('guide.plan1'),
    t('guide.plan2'),
    t('guide.plan3'),
    t('guide.plan4'),
    t('guide.plan5'),
    t('guide.plan6'),
    t('guide.plan7'),
    t('guide.plan8'),
    t('guide.plan9'),
    t('guide.plan10'),
  ]

  return (
    <div className="pt-10 px-4 max-w-6xl mx-auto">
      <Title title={t('navbar.guide')} />

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Hotels - Lago de Coatepeque</h2>
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
                  src={`/image/hotels/${a.img}.webp`}
                  alt={a.img}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 text-sm rounded p-2 shadow-lg text-right">
                  <p className="font-semibold text-gray-800">{a.price} €</p>
                  <p>{a.rooms} Zimmer</p>
                  <p>{a.persons} Personen</p>
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    See Online
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Must-See Orte</h2>
        {mustSees.map((place, i) => (
          <div key={i} className="mb-4 border p-3 rounded shadow">
            <img
              src={place.image}
              alt={place.name}
              className="mb-2 w-full rounded"
            />
            <h3 className="text-lg font-semibold">{place.name}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-bold mb-2">
          Reisetipp: Mietwagen in El Salvador
        </h2>
        <p class="mb-2">
          Für eine flexible und bequeme Reise durch El Salvador empfehlen wir
          euch,
          <strong> einen Mietwagen direkt am Flughafen San Salvador </strong>
          zu buchen. So könnt ihr direkt nach der Landung losstarten – ganz ohne
          Umwege.
        </p>
        <ul class="list-disc list-inside mb-2">
          <li>
            <strong>Mietwagen am Flughafen buchen:</strong> Das spart Zeit und
            erleichtert die An- und Abreise.
          </li>
          <li>
            <strong>4x4 empfohlen:</strong> Einige Straßen – besonders zu
            Stränden, Vulkanen oder abgelegeneren Orten – sind nur mit
            Allradantrieb komfortabel befahrbar.
          </li>
          <li>
            <strong>Gute Versicherung wichtig:</strong> Achtet auf eine
            umfassende Versicherungsdeckung (zum Beispiel Vollkasko ohne
            Selbstbeteiligung), um im Ernstfall abgesichert zu sein.
          </li>
          <li>
            <strong>Empfohlene Buchungsportale:</strong>
            <ul class="list-disc list-inside ml-4">
              <li>
                <a
                  href="https://www.billiger-mietwagen.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 underline"
                >
                  billiger-mietwagen.de
                </a>
              </li>
              <li>
                <a
                  href="https://www.kayak.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 underline"
                >
                  kayak.com
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Beide Plattformen bieten einen guten Überblick über Preise,
          Versicherungen und Fahrzeugtypen – oft günstiger als direkt bei den
          Anbietern.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Unser gemeinsamer Reiseplan</h2>
        {guidePlans.map((plan, index) => (
          <p className="mb-2" key={index}>
            {plan}
          </p>
        ))}
      </section>
    </div>
  )
}
