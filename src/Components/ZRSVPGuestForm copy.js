import DrinkOptions from './RSVPDrinkOptions'
import InputSearch from './RSVPInputSearch'
import { AnimatePresence, motion } from 'framer-motion'

const ZRSVPGuestForm = ({
  index,
  guest,
  guests,
  availableGuests,
  alreadyResponded,
  handleNameChange,
  handleGuestChange,
  toggleDrink,
  removeGuest,
  addGuest,
  drinkOptions,
  allValid,
  t,
}) => {
  return (
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
        selectedGuests={guest.name} // Nur dieser Name
        availableGuests={availableGuests}
        alreadyResponded={alreadyResponded} // Gäste, die bereits geantwortet haben
      />

      <div>
        <label>{t('rsvp.question1')}</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              checked={guest.participation === true}
              onChange={() => handleGuestChange(index, 'participation', true)}
            />{' '}
            Ja
          </label>
          <label>
            <input
              type="radio"
              checked={guest.participation === false}
              onChange={() => handleGuestChange(index, 'participation', false)}
            />{' '}
            Nein
          </label>
        </div>
      </div>

      {guest.participation === true && (
        <>
          <DrinkOptions
            guest={guest}
            index={index}
            drinkOptions={drinkOptions}
            toggleDrink={toggleDrink}
            t={t}
          />

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
                handleGuestChange(index, 'requirements', e.target.value)
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
  )
}

export default ZRSVPGuestForm
