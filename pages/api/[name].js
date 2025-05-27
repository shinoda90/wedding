import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const dbName = 'weddingDB'

export default async function handler(req, res) {
  const { name } = req.query

  if (req.method === 'PUT') {
    try {
      await client.connect()
      const db = client.db(dbName)

      const result = await db
        .collection('guests')
        .updateOne({ name }, { $set: req.body })

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Gast nicht gefunden' })
      }

      res.status(200).json({ message: 'Gast aktualisiert' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Fehler beim Aktualisieren des Gasts' })
    } finally {
      await client.close()
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
