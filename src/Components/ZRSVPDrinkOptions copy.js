const ZRSVPDrinkOptions = ({ guest, index, drinkOptions, toggleDrink, t }) => (
  <div>
    <label>{t('rsvp.question2')}</label>
    <div className="flex flex-wrap gap-2">
      {drinkOptions.map((drink) => (
        <label key={drink.id}>
          <input
            type="checkbox"
            checked={guest.drinks.includes(drink.id)}
            onChange={() => toggleDrink(index, drink.id)}
          />{' '}
          {drink.label}
        </label>
      ))}
    </div>
  </div>
)

export default ZRSVPDrinkOptions
