import React, { useState, useEffect } from 'react'

export default function RSVP() {
  const url = process.env.REACT_APP_SHEETBEST_URL
  const [allGuests, setAllGuests] = useState([])
  const [invitedGuests, setInvitedGuests] = useState([]) // Liste der eingeladenen Gäste
  const [filteredGuests, setFilteredGuests] = useState([]) // Gefilterte Gäste, basierend auf der Eingabe
  const [guestName, setGuestName] = useState('') // Name des eingegebenen Gastes
  const [isDropdownVisible, setIsDropdownVisible] = useState(false) // Steuert das Dropdown-Sichtbarkeit

  useEffect(() => {
    // Gäste von der API laden
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

        const allGuestsList = data.map((entry) => entry.Name).filter(Boolean)

        const invited = allGuestsList.filter(
          (name) =>
            !data.some(
              (entry) =>
                entry.Name === name &&
                (entry.Participation?.trim() === '' ||
                  entry.Participation === undefined)
            )
        )
        console.log('invited ' + invited)

        setAllGuests(allGuestsList)
        setInvitedGuests(invited)
        setFilteredGuests(invited)
      } catch (error) {
        console.error('Fehler beim Laden der Gästeliste:', error)
      }
    }

    fetchGuests()
  }, [url])

  // Filtere die gefilterten Gäste basierend auf der Eingabe des Benutzers
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setGuestName(inputValue)

    // Zeige Dropdown nur wenn es eine Eingabe gibt
    if (inputValue) {
      setIsDropdownVisible(true)
    } else {
      setIsDropdownVisible(false)
    }

    // Überprüfe, ob der Name im Input mit einem Namen aus der eingeladenen Liste übereinstimmt
    if (invitedGuests.includes(inputValue)) {
      // Entferne den übereinstimmenden Namen aus der eingeladenen Liste
      const updatedInvitedGuests = invitedGuests.filter(
        (guest) => guest !== inputValue
      )
      setInvitedGuests(updatedInvitedGuests)
      setFilteredGuests(updatedInvitedGuests) // Optional: auch die gefilterte Liste aktualisieren
    }

    // Filtere die Gäste basierend auf dem Namen im Input
    const filtered = invitedGuests.filter((guest) =>
      guest.toLowerCase().includes(inputValue.toLowerCase())
    )

    setFilteredGuests(filtered)
  }

  // Setze den Namen basierend auf der Dropdown-Auswahl
  const handleDropdownChange = (e) => {
    const selectedGuest = e.target.textContent
    setGuestName(selectedGuest)
    setIsDropdownVisible(false) // Verstecke das Dropdown nach Auswahl

    // Überprüfe, ob der ausgewählte Gast noch in der eingeladenen Liste vorhanden ist und entferne ihn
    if (invitedGuests.includes(selectedGuest)) {
      const updatedInvitedGuests = invitedGuests.filter(
        (guest) => guest !== selectedGuest
      )
      setInvitedGuests(updatedInvitedGuests)
      setFilteredGuests(updatedInvitedGuests) // Optional: auch die gefilterte Liste aktualisieren
    }
  }

  // Verhindere das Dropdown beim Verlassen des Eingabefelds
  const handleBlur = () => {
    // Verzögert das Verstecken, um die Auswahl zu ermöglichen
    setTimeout(() => setIsDropdownVisible(false), 100)
  }

  console.log('all Guests ' + allGuests)
  console.log('filtered Guests ' + filteredGuests)
  console.log('invited Guests ' + invitedGuests)

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="guestName">Gast Name</label>
          <input
            type="text"
            id="guestName"
            value={guestName}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownVisible(true)} // Dropdown anzeigen, wenn das Feld fokussiert wird
            onBlur={handleBlur} // Dropdown verstecken, wenn das Feld den Fokus verliert
            className="input"
            placeholder="Gib den Namen ein..."
          />

          {/* Dropdown-Liste mit den gefilterten Gästen, nur wenn sichtbar */}
          {isDropdownVisible && filteredGuests.length > 0 && (
            <ul className="dropdown-list">
              {filteredGuests.map((guest, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={handleDropdownChange}
                >
                  {guest}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  )
}
