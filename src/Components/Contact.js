import { useState } from 'react'
import InputField from './InputField'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'

export default function Contact({ title }) {
  const { t } = useTranslation()
  const [guest, setGuests] = useState({
    name: '',
    phone: '',
    message: '',
    email: '',
  })

  const handleChange = (field, value) => {
    const updatedGuests = { ...guest }
    updatedGuests[field] = value
    setGuests(updatedGuests)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const templateParams = {
      from_name: guest.name,
      from_email: guest.email,
      from_phone: guest.phone,
      from_message: guest.message,
    }

    // E-Mail an dich selbst
    emailjs
      .send(
        'service_g50pzx6',
        'template_erio50j', // dein Haupt-Template
        templateParams,
        'eDkRYc9jhwqq7CYgg'
      )
      .then(() => {
        console.log('E-Mail an dich gesendet')
      })
      .catch((error) => {
        console.error('Fehler beim Senden an dich:', error)
      })

    // Auto-Reply an den Gast
    emailjs
      .send(
        'service_g50pzx6',
        'template_rgs1l6h', // <<< Bitte durch deinen Auto-Reply-Template-Namen ersetzen
        templateParams,
        'eDkRYc9jhwqq7CYgg'
      )
      .then(() => {
        console.log('Auto-Reply gesendet')
        alert('Nachricht wurde gesendet!')
      })
      .catch((error) => {
        console.error('Fehler beim Auto-Reply:', error)
        alert('Fehler beim Auto-Reply.')
      })
  }

  return (
    <div className="m-auto pt-5">
      <form onSubmit={handleSubmit} className="">
        <div className="font-semibold text-xl text-center whitespace-nowrap m-2">
          {t('contact.formular')}
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <InputField
                title={t('contact.name')}
                type="text"
                placeholder={t('contact.placeholder1')}
                value={guest.name}
                field="name"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <InputField
                title={t('contact.email')}
                type="email"
                placeholder={t('contact.placeholder2')}
                value={guest.email}
                field="email"
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
          <InputField
            title={t('contact.phone')}
            type="number"
            placeholder={t('contact.placeholder3')}
            value={guest.phone}
            field="phone"
            onChange={handleChange}
            required={false}
          />
          <div className="gap-2 lg:gap-6">
            <div className="font-medium">{t('contact.message')}</div>
            <textarea
              className="textarea textarea-bordered w-full min-h-[90px]"
              placeholder={t('contact.placeholder4')}
              value={guest.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 pb-5">
          <button
            type="submit"
            className="btn btn-secondary w-full bg-neutral text-primary"
          >
            {t('button.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}
