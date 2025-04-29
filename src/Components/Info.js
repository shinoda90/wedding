import { useTranslation } from 'react-i18next'

export default function Info() {
  const { t } = useTranslation()

  const infoSections = [1, 2, 3, 4] // Abschnittsnummern

  return (
    <div className="text-center px-4 py-8 space-y-6 max-w-[800px] mx-auto">
      {/* Intro 1 */}
      <p className="text-lg">{t('info.intro1')}</p>

      {/* Intro 2 – Zitat */}
      <blockquote className="italic text-2xl text-secondary font-serif">
        {t('info.intro2')}
      </blockquote>

      {/* Abschnitt 1–4 */}
      {infoSections.map((num) => (
        <div key={num}>
          <h2 className="text-2xl font-bold mt-6">{t(`info.title${num}`)}</h2>
          <p className="text-base">{t(`info.descr${num}`)}</p>
        </div>
      ))}

      {/* Ende */}
      <p className="font-bold text-lg mt-8">{t('info.end')}</p>
    </div>
  )
}
