import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CheckIcon } from '../icons/check_circle.svg'
import { ReactComponent as CloseIcon } from '../icons/close_icon.svg'

export default function RSVPInputSearch({
  value,
  onChange,
  submittedNames,
  chosenGuests,
  allPossibleGuests,
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
  useEffect(() => {
    if (showOptions && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      const dropdownHeight = 240 // etwa deine max-h-60 (60*4px)

      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - rect.bottom

      if (spaceBelow < dropdownHeight) {
        const scrollY = dropdownHeight - spaceBelow + 20 // +20 für etwas Abstand

        window.scrollBy({
          top: scrollY,
          behavior: 'smooth',
        })
      }
    }
  }, [showOptions])

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
    <div className="relative w-full" ref={wrapperRef}>
      {isValid && value.trim() !== '' && (
        <CheckIcon className="w-6 h-6 fill-current text-accent absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none" />
      )}
      <input
        type="text"
        className="input input-bordered w-full pl-10" // Mehr padding links!
        placeholder={t('rsvp.placeholder1')}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowOptions(true)
        }}
        onFocus={() => setShowOptions(true)}
      />

      {value.trim() !== '' && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>
      )}
      {/* Warnhinweis nur anzeigen, wenn der Name nicht in der Liste der verfügbaren Gäste ist */}
      {!isValid && value.trim() !== '' && (
        <div className="absolute left-0 top-full w-full h-5 text-left text-red-500 text-sm">
          {t('rsvp.warning')}
        </div>
      )}
      {showOptions && (!isValid || filteredGuests.length > 0) && (
        <ul className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5">
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
                <div className="text-center text-red-400 p-2">
                  {t('rsvp.warning')}
                </div>
              )}
        </ul>
      )}
    </div>
  )
}
