import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InputSearch from './InputSearch';
import { useTranslation } from 'react-i18next';

export default function RSVP() {
  const guestStart = useMemo(
    () => [
      { name: '', email: '', phone: '', drinks: [], participation: undefined, requirements: '' },
    ],
    []
  );

  const [guests, setGuests] = useState(guestStart);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedGuests, setSubmittedGuests] = useState([]);

  const { t, i18n } = useTranslation();

  const drinkOptions = useMemo(
    () => ['Whiskey', 'Vodka', t('rsvp.answer21'), t('rsvp.answer22'), 'Aperol', 'Gin'],
    [i18n.language]
  ); // neu berechnen, wenn sich die Sprache ändert

  const handleChange = (index, field, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index][field] = value;
    setGuests(updatedGuests);
  };

  const toggleDrink = (index, drink) => {
    const updatedGuests = [...guests];
    const selectedDrinks = updatedGuests[index].drinks;
    updatedGuests[index].drinks = selectedDrinks.includes(drink)
      ? selectedDrinks.filter((d) => d !== drink)
      : [...selectedDrinks, drink];
    setGuests(updatedGuests);
  };

  const addGuest = () => {
    setGuests([
      ...guests,
      {
        name: '',
        participation: undefined,
        requirements: '',
        email: '',
        drinks: [],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitted = [];

      for (const guest of guests) {
        const payload = {
          Name: guest.name,
          Participation: guest.participation ? 'Yes' : 'No',
          Wishes: guest.participation ? guest.requirements : '',
          Email: guest.participation ? guest.email : '',
          Drinks: guest.participation ? guest.drinks.join(', ') : '',
        };

        const nameEncoded = encodeURIComponent(guest.name.trim());
        const url = `https://api.sheetbest.com/sheets/07452e3b-a7d8-4af5-9113-f2aca7cf9b89/Name/${nameEncoded}`;

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'mu6HRKCANaRrPPLgVZDKMs0Wd1NEc-ODrVxknrg-9HQNA7y1Z4x32OMxJe',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Fehler bei ${guest.name}: ${response.status}`);
        }

        submitted.push(guest);
      }

      setSubmittedGuests(submitted); // für das Popup
      setShowPopup(true);
      setGuests([
        {
          name: '',
          email: '',
          phone: '',
          drinks: [],
          participation: undefined,
          requirements: '',
        },
      ]);
    } catch (error) {
      console.error('Fehler beim Senden:', error);
      alert('Es gab ein Problem beim Senden 😕');
    }
  };

  const removeGuest = (indexToRemove) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest, index) =>
        index === indexToRemove ? { ...guest, removed: true } : guest
      )
    );

    // optional vollständig aus dem Array löschen nach Delay:
    setTimeout(() => {
      setGuests((prev) => prev.filter((_, i) => i !== indexToRemove));
    }, 200);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-4 gap-6">
          {guests.map((guest, index) => (
            <AnimatePresence key={index}>
              {!guest.removed && (
                <motion.fieldset
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-[48%] w-full bg-base-200 border-base-300 rounded-box border p-4 space-y-4 relative"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {t(`rsvp.person`)} {index + 1}
                  </h3>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-2">
                    <span className="font-medium">{t('contact.name')}</span>
                    <InputSearch
                      key={`${index}-${guest.name}`}
                      value={guest.name}
                      onChange={(name) => handleChange(index, 'name', name)}
                      selectedGuests={[
                        ...submittedGuests.map((g) => g.name),
                        ...guests.map((g, i) => (i !== index ? g.name : null)),
                      ].filter(Boolean)}
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-2">
                    <label className="label cursor-pointer">
                      <span className="font-medium ">{t('rsvp.question1')}</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`participation-${index}`}
                          value="yes"
                          checked={guest.participation === true}
                          onChange={() => handleChange(index, 'participation', true)}
                          className="radio"
                        />
                        <span>{t('rsvp.answer11')}</span>
                      </label>

                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`participation-${index}`}
                          value="no"
                          checked={guest.participation === false}
                          onChange={() => handleChange(index, 'participation', false)}
                          className="radio"
                        />
                        <span>{t('rsvp.answer12')}</span>
                      </label>
                    </div>
                  </div>
                  {guest.participation === true && (
                    <>
                      <div>
                        <div className="font-medium mb-2">{t('rsvp.question2')}</div>
                        <div className="flex flex-wrap gap-4">
                          {drinkOptions.map((drink) => (
                            <label key={drink} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={guest.drinks.includes(drink)}
                                onChange={() => toggleDrink(index, drink)}
                              />
                              {drink}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
                        <span className="font-medium whitespace-nowrap">{t('rsvp.question3')}</span>
                        <input
                          type="email"
                          className="input input-bordered w-full"
                          placeholder="z. B. max@example.com"
                          value={guest.email}
                          onChange={(e) => handleChange(index, 'email', e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
                        <span className="font-medium whitespace-nowrap">{t('rsvp.question4')}</span>
                        <input
                          type="text"
                          className="input input-bordered flex-1"
                          placeholder="Gibt es etwas, das wir wissen sollten?"
                          value={guest.requirements}
                          onChange={(e) => handleChange(index, 'requirements', e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeGuest(index)}
                      className="absolute top-2 right-40 btn btn-xs btn-error"
                    >
                      ✖ Entfernen
                    </button>
                  )}

                  {/* Add-Button nur beim letzten */}
                  {index === guests.length - 1 && (
                    <button
                      type="button"
                      onClick={addGuest}
                      className="absolute top-2 right-2 btn btn-xs btn-outline"
                    >
                      ➕ Weitere Person
                    </button>
                  )}
                </motion.fieldset>
              )}
            </AnimatePresence>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button type="submit" className="btn btn-primary">
              ✅ Abschicken
            </button>
          </div>
        </div>
      </form>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative text-center">
            <h2 className="text-2xl font-bold mb-4">{t('rsvp.feedback')}</h2>

            {submittedGuests.map((guest, i) => (
              <div key={i} className="mb-4 text-left">
                <p>
                  <strong>{t('contact.name')}:</strong> {guest.name}
                </p>
                <p>
                  <strong>{t('rsvp.question1')}:</strong> {guest.participation ? 'Ja' : 'Nein'}
                </p>
                {guest.participation && (
                  <>
                    <p>
                      <strong>{t('rsvp.question2')}:</strong> {guest.drinks.join(', ')}
                    </p>
                    <p>
                      <strong>{t('contact.email')}:</strong> {guest.email}
                    </p>
                    <p>
                      <strong>{t('rsvp.question4')}:</strong> {guest.requirements}
                    </p>
                  </>
                )}
              </div>
            ))}

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-focus"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
