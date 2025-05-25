import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CheckIcon } from '../icons/check_circle.svg'
import { ReactComponent as CloseIcon } from '../icons/close_button.svg'

export default function RSVPInputSearch({
  value,
  onChange,
  submittedNames,
  chosenGuests,
  allPossibleGuests,
  onFocus,
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

  const alreadySubmitted = submittedNames.includes(value.trim())

  const isValid =
    (value.trim() === '' || allPossibleGuests.includes(value.trim())) &&
    !alreadySubmitted

  // Gefilterte Gäste: Gäste, die im Dropdown angezeigt werden sollen
  const filteredGuests = allPossibleGuests
    .filter((guest) => guest.toLowerCase().includes(value?.toLowerCase() || ''))
    .filter((guest) => !chosenGuests.includes(guest))
    .filter((guest) => !submittedNames.includes(guest))

  return (
    <div className="relative w-full text-navbar" ref={wrapperRef}>
      {isValid && value.trim() !== '' && (
        <CheckIcon className="w-6 h-6 fill-current absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none" />
      )}
      <input
        type="text"
        className="input input-bordered w-full pl-10"
        placeholder={t('rsvp.placeholder1')}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowOptions(true)
        }}
        onFocus={onFocus}
        onClick={() => setShowOptions(true)}
      />

      {value.trim() !== '' && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <CloseIcon className="fill-secondary hover:fill-navbar" />
        </button>
      )}
      {/* Warnhinweis nur anzeigen, wenn der Name nicht in der Liste der verfügbaren Gäste ist */}
      {!isValid && value.trim() !== '' && (
        <div className="absolute left-0 top-full w-full h-5 text-left text-secondary text-sm">
          {t('rsvp.warning')}
        </div>
      )}
      {showOptions && (!isValid || filteredGuests.length > 0) && (
        <ul className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-navbar">
          {filteredGuests.length > 0
            ? filteredGuests.map((guest, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(guest)}
                  className="cursor-pointer px-4 py-2 hover:bg-primary"
                >
                  {guest}
                </li>
              ))
            : !isValid &&
              value.trim() !== '' && (
                <div className="text-center text-secondary p-2">
                  {t('rsvp.warning')}
                </div>
              )}
        </ul>
      )}
    </div>
  )
}
