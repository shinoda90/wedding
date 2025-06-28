require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'weddingDB',
})

const guestSchema = new mongoose.Schema({
  name: String,
  participation: {
    type: Boolean,
    default: undefined,
  },
  email: String,
  drinks: [String],
  requirements: String,
})

const Guest = mongoose.model('Guest', guestSchema, 'guests')

app.get('/guests', async (req, res) => {
  try {
    const allGuests = await Guest.find({})
    allGuests.forEach((g) =>
      console.log(
        `${g.name} => participation:`,
        g.participation,
        '| type:',
        typeof g.participation
      )
    )

    const guests = await Guest.find({
      participation: { $nin: [true, false] },
    })

    console.log(
      'Gefilterte Gäste:',
      guests.map((g) => g.name)
    )

    res.json(guests)
  } catch (err) {
    console.error('Fehler beim Abrufen der Gäste:', err)
    res.status(500).send('Server Error')
  }
})

app.put('/guests/:name', async (req, res) => {
  const guestName = decodeURIComponent(req.params.name)
  const updatedData = req.body

  try {
    // Beispiel mit einer MongoDB oder JSON-Datei
    const guest = guests.find((g) => g.name === guestName)
    if (!guest) return res.status(404).send({ error: 'Guest not found' })

    // Beispiel: Felder aktualisieren
    guest.participation = updatedData.participation
    guest.email = updatedData.email
    guest.requirements = updatedData.requirements
    guest.drinks = updatedData.drinks

    // speichern je nach Backend (z. B. writeFileSync, DB updateOne etc.)
    await saveGuestsToFileOrDB(guests)

    res.send({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Update failed' })
  }
})
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server läuft auf Port ${port}`))
