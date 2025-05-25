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
  participation: Boolean,
  email: String,
  drinks: [String],
  requirements: String,
})

const Guest = mongoose.model('Guest', guestSchema, 'guests')

app.get('/guests', async (req, res) => {
  try {
    const guests = await Guest.find()
    res.json(guests)
  } catch (err) {
    console.error('Fehler beim Abrufen der Gäste:', err)
    res.status(500).send('Server Error')
  }
})

app.put('/guests/:name', async (req, res) => {
  try {
    const guestName = decodeURIComponent(req.params.name)

    const updated = await Guest.findOneAndUpdate(
      { name: guestName },
      req.body,
      { new: true, upsert: true }
    )

    // Wenn kein Gast gefunden wurde
    if (!updated) {
      return res.status(404).json({ message: 'Gast nicht gefunden' })
    }

    res.json(updated)
  } catch (error) {
    console.error('Fehler beim Aktualisieren:', error)
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Gastes' })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server läuft auf Port ${port}`))
