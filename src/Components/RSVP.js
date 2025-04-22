import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function RSVP() {
  const [guests, setGuests] = useState([
    {
      name: '',
      participation: undefined,
      requirements: '',
      email: '',
      drinks: [],
    },
  ]);

  const drinkOptions = ['Whiskey', 'Vodka', 'Bier', 'Wein', 'Aperol', 'Gin'];

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

    // Konsolen-Log zur Kontrolle
    console.log('RSVP:', guests);

    try {
      for (const guest of guests) {
        const payload = {
          name: guest.name,
          participation: guest.participation,
          requirements: guest.requirements,
          email: guest.email,
          drinks: guest.drinks, // Array of strings
        };

        await fetch(
          'https://script.google.com/macros/s/AKfycbyOhyVjlpJJ9iR6KiR_LrrBBj_DWKoD_fgEUT15ualXZwTgb1I95feZoHOSicXhgH14CA/exec',
          {
            method: 'POST',
            mode: 'no-cors', // wichtig!
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );
      }

      alert('Danke für eure Rückmeldung! 🎉');
    } catch (error) {
      console.error('Fehler beim Senden an Google Sheets:', error);
      alert('Etwas ist schiefgelaufen 😕');
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
    }, 300);
  };

  return (
    <div className="p-6">
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
                  <h3 className="text-lg font-semibold mb-2">Person {index + 1}</h3>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-2">
                    <span className="font-medium">Name*</span>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Vor- und Nachname"
                      value={guest.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-2">
                    <label className="label cursor-pointer">
                      <span className="font-medium ">Wirst du teilnehmen?</span>
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
                        <span>Ja</span>
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
                        <span>Nein</span>
                      </label>
                    </div>
                  </div>
                  {guest.participation === true && (
                    <>
                      <div>
                        <div className="font-medium mb-2">Getränkewünsche</div>
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
                        <span className="font-medium whitespace-nowrap">Email (für Updates)</span>
                        <input
                          type="email"
                          className="input input-bordered w-full"
                          placeholder="z. B. max@example.com"
                          value={guest.email}
                          onChange={(e) => handleChange(index, 'email', e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
                        <span className="font-medium whitespace-nowrap">
                          Besondere Wünsche oder Allergien*
                        </span>
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
    </div>
  );
}

export default RSVP;
