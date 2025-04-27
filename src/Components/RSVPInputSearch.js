import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RSVPInputSearch({
  value,
  onChange,
  availableGuests,
  alreadyResponded,
  selectedGuests,
}) {
  const [showOptions, setShowOptions] = useState(false)
  const wrapperRef = useRef(null)
  const { t } = useTranslation()

  const handleSelect = (name) => {
    onChange(name) // Der ausgewählte Name wird an die übergeordnete Komponente weitergegeben
    setShowOptions(false) // Dropdown wird geschlossen
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Überprüfung, ob der Name ein gültiger Gästename ist
  const isValid =
    value.trim() === '' ||
    availableGuests.includes(value.trim()) ||
    selectedGuests.includes(value.trim())

  // Gefilterte Gäste: Gäste, die im Dropdown angezeigt werden sollen
  const filteredGuests = availableGuests
    .filter((guest) => guest.toLowerCase().includes(value?.toLowerCase() || ''))
    .filter((guest) => !selectedGuests.includes(guest)) // Nicht aus der Auswahl
    .filter((guest) => !alreadyResponded.includes(guest)) // Gäste, die bereits geantwortet haben, ausschließen

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        className="input input-bordered w-full mb-2"
        placeholder={t('rsvp.placeholder1')}
        value={value}
        onChange={(e) => {
          onChange(e.target.value) // Aktualisieren des Werts
          setShowOptions(true) // Dropdown anzeigen
        }}
        onFocus={() => setShowOptions(true)} // Dropdown beim Fokus öffnen
      />
      {/* Warnhinweis nur anzeigen, wenn der Name nicht in der Liste der verfügbaren Gäste ist */}
      {!isValid && value.trim() !== '' && (
        <div className="absolute left-0 top-full -mt-1 w-full h-5 text-left text-red-500 text-sm">
          {t('rsvp.warning')}
        </div>
      )}
      {showOptions && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary -mt-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredGuests.map((guest, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(guest)} // Auswahl eines Gastnamens
              className="cursor-pointer px-4 py-2 hover:bg-primary"
            >
              {guest}
            </li>
          ))}
          {filteredGuests.length === 0 && (
            <div className="text-center text-red-400 p-2">
              {t('rsvp.warning')}
            </div>
          )}
        </ul>
      )}
    </div>
  )
}
