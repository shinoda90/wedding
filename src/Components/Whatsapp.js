import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'

export default function Whatsapp() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-4">
      {/* Text */}
      <div className="font-semibold text-xl text-center lg:text-left whitespace-nowrap">
        {t('contact.whatsapp')}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center lg:justify-start">
        <a
          href="https://wa.me/41782486757"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent flex items-center justify-center gap-2 w-36"
        >
          <FaWhatsapp className="w-5 h-5" />
          Dani
        </a>
        <a
          href="https://wa.me/41783069667"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent flex items-center justify-center gap-2 w-36"
        >
          <FaWhatsapp className="w-5 h-5" />
          Michel
        </a>
      </div>
    </div>
  )
}
