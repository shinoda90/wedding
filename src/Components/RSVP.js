import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InputSearch from './RSVPInputSearch'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { ReactComponent as AddPersonIcon } from '../icons/person_add_icon.svg'
import { ReactComponent as DeletePersonIcon } from '../icons/person_remove_icon.svg'
import { useRef } from 'react'

export default function RSVP() {
  const { t, i18n } = useTranslation()
  const guestRefs = useRef([])
  const url = process.env.REACT_APP_SHEETBEST_URL
  const [allPossibleGuests, setAllPossibleGuests] = useState([]) // Alle geladenen Gäste
  const [chosenGuests, setChosenGuests] = useState([]) // Alle geladenen Gäste
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (showPopup) {
      document.body.style.overflow = 'hidden' // Scrollen deaktivieren
    } else {
      document.body.style.overflow = 'auto' // Scrollen wieder erlauben
    }

    // Cleanup für Sicherheit, falls sich etwas komisch verhält
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showPopup])

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

        // Nur Gäste, die noch NICHT geantwortet haben, verfügbar machen
        const available = allNames.filter(
          (name) => !respondedNames.includes(name)
        )
        setAllPossibleGuests(available)
      } catch (error) {
        console.error('Fehler beim Laden der Gästeliste:', error)
      }
    }

    fetchGuests()
  }, [url])

  const handleNameChange = (index, name) => {
    const updatedGuests = [...guests]
    updatedGuests[index].name = name

    // chosenGuests aktualisieren: nur gültige Namen aus updatedGuests übernehmen
    const updatedChosenGuests = updatedGuests
      .map((guest) => guest.name)
      .filter((guestName) => allPossibleGuests.includes(guestName))

    setGuests(updatedGuests)
    setChosenGuests(updatedChosenGuests) // <-- chosenGuests setzen
  }

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guests]
    updatedGuests[index][field] = value
    setGuests(updatedGuests)

    if (field === 'participation') {
      lastChangedParticipationIndexRef.current = index
    }
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
    setGuests((prevGuests) => {
      const updatedGuests = [
        ...prevGuests,
        {
          name: '',
          email: '',
          phone: '',
          drinks: [],
          participation: undefined,
          requirements: '',
        },
      ]

      setTimeout(() => {
        const lastIndex = updatedGuests.length - 1
        const lastGuestRef = guestRefs.current[lastIndex]
        if (lastGuestRef) {
          const offsetTop =
            lastGuestRef.getBoundingClientRect().top + window.scrollY
          const isDesktop = window.innerWidth >= 768
          const scrollOffset = isDesktop ? 80 : 10
          window.scrollTo({
            top: offsetTop - scrollOffset,
            behavior: 'smooth',
          })
        }
      }, 100)

      return updatedGuests
    })
  }

  const removeGuest = (index) => {
    const updatedGuests = [...guests]
    const removedGuest = updatedGuests.splice(index, 1)[0]

    // Entferne den Gast auch aus chosenGuests
    setChosenGuests((prev) =>
      prev.filter((guest) => guest !== removedGuest.name)
    )

    setGuests(updatedGuests)
  }

  const scrollGuestIntoView = (index) => {
    setTimeout(() => {
      const guestRef = guestRefs.current[index]
      if (guestRef) {
        const isDesktop = window.innerWidth >= 768
        const scrollOffset = isDesktop ? 80 : 10
        const offsetTop = guestRef.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: offsetTop - scrollOffset,
          behavior: 'smooth',
        })
      }
    }, 50) // kleiner Delay reicht
  }

  const allValid = guests.every((g) => {
    const isNameValid = g.name && allPossibleGuests.includes(g.name)
    const isNotSubmitted = !submittedGuests.some(
      (submitted) => submitted.name === g.name
    )

    const hasParticipationInfo =
      g.participation !== undefined &&
      (g.participation === false ||
        (g.email.match(/^\S+@\S+\.\S+$/) && g.drinks.length > 0))

    return isNameValid && isNotSubmitted && hasParticipationInfo
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return // Sicherheitsnetz: Doppelklick-Blocker
    setShowPopup(true)
    setIsSubmitting(true)

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
                .map((drinkId) => {
                  const drink = drinkOptions.find((d) => d.id === drinkId)
                  return drink ? drink.label : drinkId
                })
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

      setSubmittedGuests((prev) => [...prev, ...submitted])
      setChosenGuests([])

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
    } finally {
      setIsSubmitting(false) // GANZ WICHTIG: egal ob Fehler oder Erfolg → Entsperren
    }
  }

  const lastChangedParticipationIndexRef = useRef(null)

  useEffect(() => {
    if (lastChangedParticipationIndexRef.current !== null) {
      const index = lastChangedParticipationIndexRef.current

      // ✅ Nur scrollen, wenn Teilnahme "true"
      if (guests[index]?.participation !== true) {
        lastChangedParticipationIndexRef.current = null
        return
      }

      const guestRef = guestRefs.current[index]

      const timeout = setTimeout(() => {
        if (guestRef) {
          const offsetTop =
            guestRef.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: offsetTop - 10,
            behavior: 'smooth',
          })
        }
        lastChangedParticipationIndexRef.current = null // zurücksetzen
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [guests.map((g) => g.participation).join(',')])

  return (
    <div className="pb-20 max-w-[800px] mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-center gap-6">
          {guests.map((guest, index) => (
            <AnimatePresence key={index}>
              <motion.fieldset
                ref={(el) => (guestRefs.current[index] = el)}
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
                  allPossibleGuests={allPossibleGuests}
                  chosenGuests={chosenGuests}
                  submittedNames={submittedGuests.map((g) => g.name)}
                  onFocus={() => scrollGuestIntoView(index)}
                />

                <div className="pt-2">
                  <label className="font-medium">{t('rsvp.question1')}</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`participation-${index}`}
                        value="yes"
                        checked={guest.participation === true}
                        onFocus={() => scrollGuestIntoView(index)} // << HIER
                        onChange={() =>
                          handleGuestChange(index, 'participation', true)
                        }
                        className="radio radio-neutral bg-white"
                      />
                      <span>{t('rsvp.answer11')}</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`participation-${index}`}
                        value="no"
                        checked={guest.participation === false}
                        onFocus={() => scrollGuestIntoView(index)}
                        onChange={() =>
                          handleGuestChange(index, 'participation', false)
                        }
                        className="radio radio-neutral bg-white"
                      />
                      <span>{t('rsvp.answer12')}</span>
                    </label>
                  </div>
                </div>

                {guest.participation === true && (
                  <>
                    <div>
                      <label className="font-medium">
                        {t('rsvp.question2')}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 mt-2">
                        {drinkOptions.map((drink) => (
                          <label
                            key={drink.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="h-5 w-5 cursor-pointer rounded-md border-2 border-neutral bg-white 
        checked:bg-accent checked:border-neutral checked:text-primary 
        focus:outline-none transition-all duration-200 
        appearance-none relative
        after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 
        after:text-primary after:text-sm
        checked:after:content-['✓']"
                              checked={guest.drinks.includes(drink.id)}
                              onFocus={() => scrollGuestIntoView(index)}
                              onChange={() => toggleDrink(index, drink.id)}
                            />
                            <span className="text-base">{drink.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-medium whitespace-nowrap">
                        {t('rsvp.question3')}
                      </span>
                      <input
                        type="email"
                        className="input input-bordered w-full"
                        placeholder={t('rsvp.placeholder3')}
                        value={guest.email}
                        onFocus={() => scrollGuestIntoView(index)} // << HIER
                        onChange={(e) =>
                          handleGuestChange(index, 'email', e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-medium">{t('rsvp.question4')}</span>
                      <input
                        type="text"
                        className="input input-bordered"
                        placeholder={t('rsvp.placeholder4')}
                        value={guest.requirements}
                        onFocus={() => scrollGuestIntoView(index)} // << HIER
                        onChange={(e) =>
                          handleGuestChange(
                            index,
                            'requirements',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </>
                )}

                <div className="absolute top-0 right-5 flex gap-5">
                  {index === guests.length - 1 && (
                    <button
                      type="button"
                      onClick={addGuest}
                      className="btn btn-xs bg-accent"
                    >
                      <AddPersonIcon />
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeGuest(index)}
                      className="btn btn-xs bg-warning"
                    >
                      <DeletePersonIcon />
                    </button>
                  )}
                </div>
              </motion.fieldset>
            </AnimatePresence>
          ))}
        </div>
        <div className="z-50 flex justify-center pointer-events-none mt-5">
          <button
            type="submit"
            id="submit-button"
            className="btn btn-neutral  pointer-events-auto w-[90%] md:w-[48%]"
            disabled={!allValid || isSubmitting}
          >
            {isSubmitting
              ? t('button.loading')
              : allValid
                ? t('button.submit')
                : t('button.warning')}
          </button>
        </div>
      </form>

      {showPopup &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-neutral">
            <div
              className="bg-primary rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 relative text-center
          transform scale-95 opacity-0 animate-popup
          h-[90vh] flex flex-col"
            >
              {!isSubmitting && (
                <h2 className="text-2xl font-bold mb-6">
                  {t('rsvp.feedback')}
                </h2>
              )}

              {/* Scrollbarer Bereich */}
              <div className="flex-1 overflow-y-auto w-full space-y-6">
                {isSubmitting ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-lg font-semibold">
                      {t('button.loading')}
                    </p>
                  </div>
                ) : (
                  submittedGuests.map((guest, i) => (
                    <div
                      key={i}
                      className="border border-neutral rounded-lg p-4 text-left bg-secondary"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {t('rsvp.person')} {i + 1}
                      </h3>

                      <p className="mb-2">
                        <strong>{t('contact.name')}:</strong> {guest.name}
                      </p>
                      <p className="mb-2">
                        <strong>{t('rsvp.question1')}:</strong>{' '}
                        {guest.participation ? 'Yes' : 'No'}
                      </p>

                      {guest.participation && (
                        <>
                          <p className="mb-2">
                            <strong>{t('rsvp.question2')}:</strong>{' '}
                            {guest.drinks.join(', ')}
                          </p>
                          <p className="mb-2">
                            <strong>{t('contact.email')}:</strong> {guest.email}
                          </p>
                          <p className="mb-2">
                            <strong>{t('rsvp.question4')}:</strong>{' '}
                            {guest.requirements}
                          </p>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* OK-Button nur wenn nicht am Laden */}
              {!isSubmitting && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-6 py-2 bg-secondary rounded hover:bg-primary-focus"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.getElementById('popup-root')
        )}
    </div>
  )
}
