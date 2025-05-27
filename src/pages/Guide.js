import Title from '../Components/Title'
import { useTranslation } from 'react-i18next'
import { lake, salvador, mustSees } from '../data/data'
import arriveIcon from '../../src/icons/ItineraryIcon1.svg'
import churchIcon from '../../src/icons/ItineraryIcon2.svg'
import cakeIcon from '../../src/icons/ItineraryIcon3.svg'
import gamesIcon from '../../src/icons/ItineraryIcon4.svg'

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
              <p>{t(`guide.mustSee${i + 1}`)}</p>
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
                  <p className="font-semibold text-gray-800">
                    {a.price} € / {t('guide.night')}
                  </p>
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
                    className="text-secondary underline"
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
                  <p className="font-semibold text-gray-800">
                    {a.price} € / {t('guide.night')}
                  </p>
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
                    className="text-secondary underline"
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
