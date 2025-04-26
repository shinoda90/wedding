import { useState } from 'react';
import Title from './Title';
import InputField from './InputField';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

export default function Contact({ title }) {
  const { t } = useTranslation();
  const [guest, setGuests] = useState({
    name: '',
    phone: '',
    message: '',
    email: '',
  });

  const handleChange = (field, value) => {
    const updatedGuests = { ...guest };
    updatedGuests[field] = value;
    setGuests(updatedGuests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: guest.name,
      from_email: guest.email,
      from_phone: guest.phone,
      from_message: guest.message,
    };

    // E-Mail an dich selbst
    emailjs
      .send(
        'service_g50pzx6',
        'template_erio50j', // dein Haupt-Template
        templateParams,
        'eDkRYc9jhwqq7CYgg'
      )
      .then(() => {
        console.log('E-Mail an dich gesendet');
      })
      .catch((error) => {
        console.error('Fehler beim Senden an dich:', error);
      });

    // Auto-Reply an den Gast
    emailjs
      .send(
        'service_g50pzx6',
        'template_rgs1l6h', // <<< Bitte durch deinen Auto-Reply-Template-Namen ersetzen
        templateParams,
        'eDkRYc9jhwqq7CYgg'
      )
      .then(() => {
        console.log('Auto-Reply gesendet');
        alert('Nachricht wurde gesendet!');
      })
      .catch((error) => {
        console.error('Fehler beim Auto-Reply:', error);
        alert('Fehler beim Auto-Reply.');
      });
  };

  return (
    <section>
      <div className="lg:w-1/3 m-auto p-4">
        <Title title={title} />
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col gap-4">
            <InputField
              title={t('contact.name')}
              type="text"
              placeholder="Your Full Name"
              value={guest.name}
              field="name"
              onChange={handleChange}
              required={true}
            />
            <InputField
              title={t('contact.email')}
              type="email"
              placeholder="dani@michel.com"
              value={guest.email}
              field="email"
              onChange={handleChange}
              required={true}
            />
            <InputField
              title={t('contact.phone')}
              type="number"
              placeholder="+41..."
              value={guest.phone}
              field="phone"
              onChange={handleChange}
              required={false}
            />
            <div className="gap-2 lg:gap-6">
              <div className="font-medium">{t('contact.message')}</div>
              <textarea
                className="textarea textarea-bordered w-full min-h-[120px]"
                placeholder="What would you like to share with us"
                value={guest.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <button type="submit" className="btn btn-primary">
              ✅ Abschicken
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
