const ZRSVPPopup = ({ showPopup, submittedGuests, setShowPopup, t }) => {
  return (
    showPopup && (
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
    )
  )
}

export default ZRSVPPopup
