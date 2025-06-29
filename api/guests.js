import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const dbName = 'weddingDB'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect()
      const db = client.db(dbName)
      const collection = db.collection('guests')

      const guests = await collection
        .find({
          $or: [{ participation: null }, { participation: { $exists: false } }],
        })
        .toArray()
      res.status(200).json(guests)
    } catch (error) {
      console.error('Fehler beim Abrufen:', error)
      res.status(500).json({ message: 'Fehler beim Abrufen der Gäste' })
    } finally {
      await client.close()
    }
  } else if (req.method === 'POST') {
    try {
      const newGuest = req.body
      await client.connect()
      const db = client.db(dbName)
      const result = await db.collection('guests').insertOne(newGuest)
      res
        .status(201)
        .json({ message: 'Gast hinzugefügt', id: result.insertedId })
    } catch (error) {
      console.error('Fehler beim Hinzufügen:', error)
      res.status(500).json({ message: 'Fehler beim Hinzufügen des Gasts' })
    } finally {
      await client.close()
    }
  } else if (req.method === 'PUT') {
    // ... dein PUT Block ist hier korrekt implementiert ...
    const guestName = decodeURIComponent(req.query.name)
    const updatedData = req.body

    try {
      await client.connect()
      const db = client.db(dbName)
      const collection = db.collection('guests') // <-- HIER IST SIE KORREKT

      const result = await collection.updateOne(
        { name: guestName },
        {
          $set: {
            participation: updatedData.participation,
            email: updatedData.email,
            requirements: updatedData.requirements,
            drinks: updatedData.drinks,
            transport: updatedData.transport,
          },
        }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Guest not found' })
      }

      res
        .status(200)
        .json({ success: true, message: 'Gast erfolgreich aktualisiert' })
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Gasts:', error)
      res.status(500).json({ error: 'Update failed', details: error.message })
    } finally {
      await client.close()
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
