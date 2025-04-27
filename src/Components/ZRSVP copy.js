import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InputSearch from './RSVPInputSearch'
import GuestForm from './RSVPGuestForm'
import Popup from './RSVPPopup'
import { useTranslation } from 'react-i18next'

export default function ZRSVP() {
  const { t, i18n } = useTranslation()
  const url = process.env.REACT_APP_SHEETBEST_URL
  const [allGuests, setAllGuests] = useState([])
  const [alreadyResponded, setAlreadyResponded] = useState([])
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
      { id: 'sangria', label: t('rsvp.answer21') },
      { id: 'cava', label: t('rsvp.answer22') },
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

        setAllGuests(allNames)
        setAlreadyResponded(respondedNames)

        // Nur Gäste, die noch NICHT geantwortet haben, verfügbar machen
        const available = allNames.filter(
          (name) => !respondedNames.includes(name)
        )
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

    let updatedAvailable = [...allGuests] // Verwende allGuests als Basis

    // Wenn vorher ein Name gewählt war, füge ihn zurück
    if (previousName && !updatedAvailable.includes(previousName)) {
      updatedAvailable.push(previousName)
    }

    // Wenn neuer Name gültig ist (in der Liste), dann rausnehmen
    updatedAvailable = updatedAvailable.filter(
      (g) => g !== name && !alreadyResponded.includes(g)
    )

    // Filtere alle gültigen Gäste, die noch nicht geantwortet haben
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

    if (removedGuest.name && !availableGuests.includes(removedGuest.name)) {
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
            <>
              {' '}
              {console.log(guest)}
              <GuestForm
                key={index}
                index={index}
                guest={guest}
                guests={guests}
                availableGuests={availableGuests}
                alreadyResponded={alreadyResponded}
                handleNameChange={handleNameChange}
                handleGuestChange={handleGuestChange}
                toggleDrink={toggleDrink}
                removeGuest={removeGuest}
                addGuest={addGuest}
                drinkOptions={drinkOptions}
                allValid={allValid}
                t={t}
              />
            </>
          ))}
        </div>
        <div className="w-full flex justify-center pt-8">
          <button type="submit" className="btn btn-accent" disabled={!allValid}>
            {t('button.submit')}
          </button>
        </div>
      </form>

      <Popup
        showPopup={showPopup}
        submittedGuests={submittedGuests}
        setShowPopup={setShowPopup}
        t={t}
      />
    </>
  )
}
