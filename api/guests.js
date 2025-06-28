import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const dbName = 'weddingDB'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect()
      const db = client.db(dbName)
      const guests = await collection
        .find({
          participation: { $ne: true, $ne: false },
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
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
