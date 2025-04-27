import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InputSearch from './AInputSearch'
import { useTranslation } from 'react-i18next'

export default function RSVP() {
  const { t, i18n } = useTranslation()
  const url = process.env.REACT_APP_SHEETBEST_URL
  const [allGuests, setAllGuests] = useState([]) // Alle geladenen Gäste
  const [alreadyResponded, setAlreadyResponded] = useState([]) // Gäste mit Antwort

  const [guests, setGuests] = useState([
    {
      name: '',
      email: '',
      phone: '',
      drinks: [],
      participation: undefined,
      requirements: '',
    },
  ])
  const [availableGuests, setAvailableGuests] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [submittedGuests, setSubmittedGuests] = useState([])

  const drinkOptions = useMemo(
    () => [
      { id: 'whiskey', label: 'Whiskey' },
      { id: 'vodka', label: 'Vodka' },
      { id: 'wine', label: t('rsvp.answer21') },
      { id: 'beer', label: t('rsvp.answer22') },
      { id: 'aperol', label: 'Aperol' },
      { id: 'gin', label: 'Gin' },
    ],
    [i18n.language]
  )

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.REACT_APP_SHEETBEST_API_KEY,
          },
        })
        const data = await response.json()

        // Alle Gäste laden
        const allNames = data.map((entry) => entry.Name).filter(Boolean)

        // Gäste, die schon geantwortet haben (Participation ist ausgefüllt)
        const respondedNames = data
          .filter(
            (entry) => entry.Participation && entry.Participation.trim() !== ''
          )
          .map((entry) => entry.Name)

        setAlreadyResponded(respondedNames)

        // Nur Gäste, die noch NICHT geantwortet haben, verfügbar machen
        const available = allNames.filter(
          (name) => !respondedNames.includes(name)
        )
        setAllGuests(available)
        setAvailableGuests(available)
      } catch (error) {
        console.error('Fehler beim Laden der Gästeliste:', error)
      }
    }

    fetchGuests()
  }, [url])

  const handleNameChange = (index, name) => {
    const updatedGuests = [...guests]
    const previousName = updatedGuests[index].name
    updatedGuests[index].name = name

    let updatedAvailable = [...availableGuests]

    // Wenn vorher ein Name gewählt war und dieser Name in allGuests vorhanden ist, füge ihn zurück
    if (
      previousName &&
      allGuests.includes(previousName) &&
      !updatedAvailable.includes(previousName)
    ) {
      updatedAvailable.push(previousName)
    }

    // Wenn der Name im Inputfeld gelöscht wird, überprüfe, ob der Name wieder in availableGuests aufgenommen werden kann
    if (name === '' || allGuests.includes(name)) {
      updatedAvailable = updatedAvailable.filter((g) => g !== name)
    } else {
      // Wenn der Name nicht im allGuests vorhanden ist, nicht in availableGuests aufnehmen
      console.log(`Der Name ${name} ist nicht in der Gästeliste enthalten!`)
    }

    setAvailableGuests(updatedAvailable)
    setGuests(updatedGuests)
  }

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guests]
    updatedGuests[index][field] = value
    setGuests(updatedGuests)
  }

  const toggleDrink = (index, drinkId) => {
    const updatedGuests = [...guests]
    const selectedDrinks = updatedGuests[index].drinks || []
    updatedGuests[index].drinks = selectedDrinks.includes(drinkId)
      ? selectedDrinks.filter((d) => d !== drinkId)
      : [...selectedDrinks, drinkId]
    setGuests(updatedGuests)
  }

  const addGuest = () => {
    setGuests([
      ...guests,
      {
        name: '',
        email: '',
        phone: '',
        drinks: [],
        participation: undefined,
        requirements: '',
      },
    ])
  }

  const removeGuest = (index) => {
    const updatedGuests = [...guests]
    const removedGuest = updatedGuests.splice(index, 1)[0]

    if (
      removedGuest.name &&
      allGuests.includes(removedGuest.name) &&
      !availableGuests.includes(removedGuest.name)
    ) {
      setAvailableGuests([...availableGuests, removedGuest.name])
    }

    setGuests(updatedGuests)
  }

  const allValid = guests.every(
    (g) =>
      g.name &&
      g.participation !== undefined &&
      (g.participation === false ||
        (g.email.match(/^\S+@\S+\.\S+$/) && g.drinks.length > 0))
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitted = []

      for (const guest of guests) {
        const payload = {
          Name: guest.name,
          Participation: guest.participation ? 'Yes' : 'No',
          Wishes: guest.requirements || '',
          Email: guest.participation ? guest.email : '',
          Drinks: guest.participation
            ? guest.drinks
                .map(
                  (drinkId) => drinkOptions.find((d) => d.id === drinkId)?.label
                )
                .join(', ')
            : '',
        }

        const nameEncoded = encodeURIComponent(guest.name.trim())
        const guestUrl = `${url}/Name/${nameEncoded}`

        const response = await fetch(guestUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.REACT_APP_SHEETBEST_API_KEY,
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`Fehler bei ${guest.name}`)
        }

        submitted.push(guest)
      }

      setSubmittedGuests(submitted)
      setShowPopup(true)
      setGuests([
        {
          name: '',
          email: '',
          phone: '',
          drinks: [],
          participation: undefined,
          requirements: '',
        },
      ])
    } catch (error) {
      console.error('Fehler beim Senden:', error)
      alert('Es gab ein Problem beim Senden 😕')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-center gap-6">
          {guests.map((guest, index) => (
            <AnimatePresence key={index}>
              <motion.fieldset
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-secondary border-primary rounded-box border p-4 space-y-4 relative w-[90%] md:w-[48%]"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {t('rsvp.person')} {index + 1}
                </h3>

                <InputSearch
                  value={guest.name}
                  onChange={(name) => handleNameChange(index, name)}
                  selectedGuests={guests.map((g) => g.name)} // HIER!!!
                  availableGuests={availableGuests}
                  alreadyResponded={alreadyResponded} // Prop übergeben
                />

                <div>
                  <label>{t('rsvp.question1')}</label>
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        checked={guest.participation === true}
                        onChange={() =>
                          handleGuestChange(index, 'participation', true)
                        }
                      />{' '}
                      Ja
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={guest.participation === false}
                        onChange={() =>
                          handleGuestChange(index, 'participation', false)
                        }
                      />{' '}
                      Nein
                    </label>
                  </div>
                </div>

                {guest.participation === true && (
                  <>
                    <div>
                      <label>{t('rsvp.question2')}</label>
                      <div className="flex flex-wrap gap-2">
                        {drinkOptions.map((drink) => (
                          <label key={drink.id}>
                            <input
                              type="checkbox"
                              checked={guest.drinks.includes(drink.id)}
                              onChange={() => toggleDrink(index, drink.id)}
                            />{' '}
                            {drink.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label>{t('contact.email')}</label>
                      <input
                        type="email"
                        value={guest.email}
                        onChange={(e) =>
                          handleGuestChange(index, 'email', e.target.value)
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label>{t('rsvp.question4')}</label>
                      <input
                        type="text"
                        value={guest.requirements}
                        onChange={(e) =>
                          handleGuestChange(
                            index,
                            'requirements',
                            e.target.value
                          )
                        }
                        className="input input-bordered w-full"
                      />
                    </div>
                  </>
                )}

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeGuest(index)}
                    className="absolute top-2 right-20 btn btn-xs btn-error"
                  >
                    {t('rsvp.delete')}
                  </button>
                )}
                {index === guests.length - 1 && (
                  <button
                    type="button"
                    onClick={addGuest}
                    className="absolute top-2 right-2 btn btn-xs btn-outline"
                  >
                    {t('rsvp.add')}
                  </button>
                )}
              </motion.fieldset>
            </AnimatePresence>
          ))}
        </div>
        <div className="w-full flex justify-center pt-8">
          <button type="submit" className="btn btn-accent" disabled={!allValid}>
            {t('button.submit')}
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative text-center">
            <h2 className="text-2xl font-bold mb-4">{t('rsvp.feedback')}</h2>
            {submittedGuests.map((guest, i) => (
              <div key={i} className="mb-4">
                <p>
                  <strong>{t('contact.name')}:</strong> {guest.name}
                </p>
              </div>
            ))}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-2 bg-secondary text-white rounded hover:bg-primary-focus"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
