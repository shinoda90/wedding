import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI // in Vercel als Environment Variable setzen
const client = new MongoClient(uri)
const dbName = 'weddingDB' // z. B. hochzeit

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect()
      const db = client.db(dbName)
      const guests = await db.collection('guests').find().toArray()
      res.status(200).json(guests)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Fehler beim Abrufen der Gäste' })
    } finally {
      await client.close()
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
