import { useEffect, useState, useRef } from 'react';

export default function InputSearch({ value, onChange, selectedGuests }) {
  const [guestList, setGuestList] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch('https://api.sheetbest.com/sheets/07452e3b-a7d8-4af5-9113-f2aca7cf9b89')
      .then((res) => res.json())
      .then((data) => {
        const unanswered = data
          .filter((row) => !row.Participation || row.Participation.trim() === '')
          .map((row) => row.Name);
        setGuestList(unanswered);
      });
  }, []);

  const filteredGuests = guestList
    .filter((guest) => guest.toLowerCase().includes(value?.toLowerCase() || ''))
    .filter((guest) => !selectedGuests.includes(guest));

  const handleSelect = (name) => {
    onChange(name);
    setShowOptions(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Name suchen oder auswählen"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && filteredGuests.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredGuests.map((guest, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(guest)}
              className="cursor-pointer px-4 py-2 hover:bg-primary"
            >
              {guest}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
