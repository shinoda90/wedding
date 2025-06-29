import React, { useState, useEffect, useMemo } from 'react'

export default function Analysis() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')

  const [filterCriteria, setFilterCriteria] = useState({
    name: '',
    participation: 'all',
    requirements: '',
    transport: 'all',
    filterByDrink: null,
  })

  const drinkColumns = [
    { id: 'wine', label: 'Wine' },
    { id: 'beer', label: 'Beer' },
    { id: 'aperol', label: 'Aperol' },
    { id: 'gin', label: 'Gin' },
    { id: 'vodka', label: 'Vodka' },
    { id: 'tequila', label: 'Tequila' },
    { id: 'whiskey', label: 'Whiskey' },
    { id: 'no alcohol', label: 'No Alcohol' },
  ]

  useEffect(() => {
    if (isAuthenticated) {
      const fetchGuests = async () => {
        setLoading(true)
        setError(null)

        try {
          const response = await fetch('api/analysis', {
            headers: {
              'X-Auth-Password': passwordInput,
            },
          })

          if (response.status === 401 || response.status === 403) {
            setIsAuthenticated(false)
            throw new Error(
              'Zugriff verweigert: Falsches Passwort oder nicht autorisiert.'
            )
          }

          if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`)
          }

          const data = await response.json()
          setGuests(data)
        } catch (err) {
          console.error('Fehler beim Laden der Gäste:', err)
          setError(`Fehler beim Laden der Gäste: ${err.message}`)
        } finally {
          setLoading(false)
        }
      }

      fetchGuests()
    }
  }, [isAuthenticated, passwordInput])

  const filteredGuests = useMemo(() => {
    let currentFilteredGuests = guests

    if (filterCriteria.name) {
      currentFilteredGuests = currentFilteredGuests.filter((guest) =>
        (guest.name || '')
          .toLowerCase()
          .includes(filterCriteria.name.toLowerCase())
      )
    }

    if (filterCriteria.participation !== 'all') {
      currentFilteredGuests = currentFilteredGuests.filter((guest) => {
        if (filterCriteria.participation === 'yes') {
          return guest.participation === true
        } else if (filterCriteria.participation === 'no') {
          return guest.participation === false
        } else if (filterCriteria.participation === 'pending') {
          return (
            guest.participation === null || guest.participation === undefined
          )
        }
        return true
      })
    }

    if (filterCriteria.requirements) {
      currentFilteredGuests = currentFilteredGuests.filter((guest) =>
        (guest.requirements || '')
          .toLowerCase()
          .includes(filterCriteria.requirements.toLowerCase())
      )
    }

    if (filterCriteria.transport !== 'all') {
      currentFilteredGuests = currentFilteredGuests.filter((guest) => {
        const guestTransportString = Array.isArray(guest.transport)
          ? guest.transport.map((t) => t.toLowerCase()).join(',')
          : String(guest.transport || '').toLowerCase()

        if (filterCriteria.transport === 'no') {
          return guestTransportString.includes('no')
        } else if (filterCriteria.transport === 'go') {
          return (
            guestTransportString.includes('go') &&
            !guestTransportString.includes('return')
          )
        } else if (filterCriteria.transport === 'return') {
          return (
            guestTransportString.includes('return') &&
            !guestTransportString.includes('go')
          )
        } else if (filterCriteria.transport === 'go,return') {
          return (
            guestTransportString.includes('go') &&
            guestTransportString.includes('return')
          )
        }
        return true
      })
    }

    if (filterCriteria.filterByDrink) {
      currentFilteredGuests = currentFilteredGuests.filter((guest) => {
        let rawDrinks = guest.drinks
        let drinksStringForFilter = ''

        if (Array.isArray(rawDrinks)) {
          drinksStringForFilter = rawDrinks.join(',')
        } else if (typeof rawDrinks === 'string') {
          drinksStringForFilter = rawDrinks
        }
        const guestDrinksArrayForFilter = drinksStringForFilter
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s)
        const guestDrinksSetForFilter = new Set(guestDrinksArrayForFilter)

        return guestDrinksSetForFilter.has(filterCriteria.filterByDrink)
      })
    }

    return currentFilteredGuests
  }, [guests, filterCriteria])

  const calculatedDrinkCounts = useMemo(() => {
    const counts = {}
    drinkColumns.forEach((drink) => {
      counts[drink.id] = 0
    })

    guests.forEach((guest) => {
      let rawDrinks = guest.drinks
      let drinksString = ''
      if (Array.isArray(rawDrinks)) {
        drinksString = rawDrinks.join(',')
      } else if (typeof rawDrinks === 'string') {
        drinksString = rawDrinks
      }
      const guestDrinksArray = drinksString
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s)

      const numDrinks = guestDrinksArray.length

      if (numDrinks > 0) {
        const contribution = 1 / numDrinks
        guestDrinksArray.forEach((drinkId) => {
          if (counts.hasOwnProperty(drinkId)) {
            counts[drinkId] += contribution
          }
        })
      }
    })

    const roundedCounts = {}
    for (const drinkId in counts) {
      if (counts.hasOwnProperty(drinkId)) {
        roundedCounts[drinkId] = Math.ceil(counts[drinkId])
      }
    }
    return roundedCounts
  }, [guests, drinkColumns])

  const calculatedParticipationCounts = useMemo(() => {
    const counts = {
      yes: 0,
      no: 0,
      pending: 0,
      all: guests.length,
    }

    guests.forEach((guest) => {
      if (guest.participation === true) {
        counts.yes++
      } else if (guest.participation === false) {
        counts.no++
      } else {
        counts.pending++
      }
    })
    return counts
  }, [guests])

  const calculatedTransportCounts = useMemo(() => {
    const counts = {
      all: guests.length,
      no: 0,
      go: 0,
      return: 0,
      'go,return': 0,
    }

    guests.forEach((guest) => {
      const guestTransportString = Array.isArray(guest.transport)
        ? guest.transport.map((t) => t.toLowerCase()).join(',')
        : String(guest.transport || '').toLowerCase()

      const hasGo = guestTransportString.includes('go')
      const hasReturn = guestTransportString.includes('return')
      const hasNo = guestTransportString.includes('no')

      if (hasNo) {
        counts.no++
      } else if (hasGo && hasReturn) {
        counts['go,return']++
      } else if (hasGo) {
        counts.go++
      } else if (hasReturn) {
        counts.return++
      }
    })
    return counts
  }, [guests])

  const handleFilterChange = (column, value) => {
    setFilterCriteria((prev) => ({
      ...prev,
      [column]: value,
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput.trim() !== '') {
      setIsAuthenticated(true)
      setError(null)
    } else {
      setError('Bitte geben Sie ein Passwort ein.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-30 max-w-lg m-auto pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-neutral">
          Zugriff zur Gästeanalyse
        </h2>
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <label
            htmlFor="password"
            className="block text-left text-neutral text-lg mb-2"
          >
            Passwort:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700 bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Passwort eingeben..."
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="pt-30 max-w-6xl m-auto pb-20 text-center">
        <p className="text-xl text-neutral">Gäste werden geladen...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-30 max-w-6xl m-auto pb-20 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  if (guests.length === 0 && !loading) {
    return (
      <div className="pt-30 max-w-6xl m-auto pb-20 text-center">
        <p className="text-xl text-neutral">Keine Gäste gefunden.</p>
      </div>
    )
  }

  return (
    <div className="pt-12 mx-5 m-auto pb-10">
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)] rounded-box shadow-lg mt-8 border border-primary">
        <table className="table w-full text-neutral-content bg-white ">
          <thead className="sticky top-0 z-10 ">
            <tr className="bg-neutral">
              <th className="py-3 px-4 text-lg font-bold text-white text-left border-r border-gray-300 w-[120px]">
                Name
                <input
                  type="text"
                  placeholder="Name filtern..."
                  value={filterCriteria.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className={`mt-1 block w-full p-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white ${filterCriteria.name ? '!bg-blue-500 !text-white transition-colors duration-200' : ''}`}
                />
              </th>
              <th className="py-3 px-4 text-lg font-bold text-white text-left border-r border-gray-300 min-w-[80px]">
                Participation?
                <select
                  value={filterCriteria.participation}
                  onChange={(e) =>
                    handleFilterChange('participation', e.target.value)
                  }
                  className={`mt-1 block p-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white ${filterCriteria.participation !== 'all' ? '!bg-blue-500 !text-white transition-colors duration-200' : ''}`}
                >
                  <option value="all">
                    All ({calculatedParticipationCounts.all})
                  </option>
                  <option value="yes">
                    Yes ({calculatedParticipationCounts.yes})
                  </option>
                  <option value="no">
                    No ({calculatedParticipationCounts.no})
                  </option>
                  <option value="pending">
                    Pending ({calculatedParticipationCounts.pending})
                  </option>
                </select>
              </th>
              {drinkColumns.map((drink, index) => (
                <th
                  key={drink.id}
                  className={`py-2 font-semibold text-center border-r border-gray-300 min-w-[40px]`}
                >
                  <span
                    className={`
                      inline-block w-full py-1 px-2 rounded-md cursor-pointer select-none
                      transition-colors duration-200
                      bg-gray-100 text-black
                      hover:bg-blue-400 hover:text-white
                      ${
                        filterCriteria.filterByDrink === drink.id
                          ? '!bg-blue-500 !text-white'
                          : ''
                      }
                    `}
                    onClick={() =>
                      handleFilterChange(
                        'filterByDrink',
                        filterCriteria.filterByDrink === drink.id
                          ? null
                          : drink.id
                      )
                    }
                  >
                    {drink.label} ({calculatedDrinkCounts[drink.id] || 0})
                  </span>
                  <div className="text-xs font-normal text-black mt-1"></div>
                </th>
              ))}
              <th className="py-3 px-4 text-lg font-bold text-white text-left border-r border-gray-300 min-w-[150px]">
                Requirements
                <input
                  type="text"
                  placeholder="Requirements filtern..."
                  value={filterCriteria.requirements}
                  onChange={(e) =>
                    handleFilterChange('requirements', e.target.value)
                  }
                  className={`mt-1 block w-full p-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white ${filterCriteria.requirements ? '!bg-blue-500 !text-white transition-colors duration-200' : ''}`}
                />
              </th>
              <th className="py-3 px-4 text-lg font-bold text-left min-w-[160px] text-white">
                Transport
                <select
                  value={filterCriteria.transport}
                  onChange={(e) =>
                    handleFilterChange('transport', e.target.value)
                  }
                  className={`mt-1 block w-full p-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white ${filterCriteria.transport !== 'all' ? '!bg-blue-500 !text-white transition-colors duration-200' : ''}`}
                >
                  <option value="all">
                    All ({calculatedTransportCounts.all})
                  </option>
                  <option value="no">
                    No ({calculatedTransportCounts.no})
                  </option>
                  <option value="go">
                    Go ({calculatedTransportCounts.go})
                  </option>
                  <option value="return">
                    Return ({calculatedTransportCounts.return})
                  </option>
                  <option value="go,return">
                    Go and Return ({calculatedTransportCounts['go,return']})
                  </option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map((guest, index) => {
              let rawDrinks = guest.drinks
              let drinksStringForDisplay = ''

              if (Array.isArray(rawDrinks)) {
                drinksStringForDisplay = rawDrinks.join(',')
              } else if (typeof rawDrinks === 'string') {
                drinksStringForDisplay = rawDrinks
              }
              const guestDrinksArray = drinksStringForDisplay
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s)
              const guestDrinksSet = new Set(guestDrinksArray)

              return (
                <tr
                  key={guest._id || index}
                  className={`${index % 2 === 0 ? 'bg-secondary' : 'bg-base-200'} border-b border-primary-content`}
                >
                  <td className="py-3 px-4 whitespace-nowrap border-r border-gray-200 min-w-[120px]">
                    {guest.name || ''}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 min-w-[80px]">
                    {guest.participation === true && 'Yes'}
                    {guest.participation === false && 'No'}
                    {(guest.participation === null ||
                      guest.participation === undefined) &&
                      'Pending'}
                  </td>
                  {drinkColumns.map((drink) => {
                    const hasDrink = guestDrinksSet.has(drink.id)
                    return (
                      <td
                        key={drink.id}
                        className="py-2 px-2 border-r border-gray-200 text-center min-w-[40px]"
                      >
                        {hasDrink ? 'x' : ''}
                      </td>
                    )
                  })}
                  <td className="py-3 px-4 border-r border-gray-200 min-w-[150px]">
                    {guest.requirements || ''}
                  </td>
                  <td className="py-3 px-4 min-w-[80px]">
                    {Array.isArray(guest.transport)
                      ? guest.transport.join(', ') || ''
                      : guest.transport || ''}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {filteredGuests.length === 0 && !loading && guests.length > 0 && (
        <p className="text-center text-xl text-neutral mt-4">
          Keine Gäste entsprechen den Filterkriterien.
        </p>
      )}
    </div>
  )
}
