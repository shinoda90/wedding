// api/analysis.js
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD // WICHTIG: ADMIN_PASSWORD in Vercel Umgebungsvariablen setzen!

const client = new MongoClient(uri)
let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  await client.connect()
  cachedDb = client.db('weddingDB')
  return cachedDb
}

export default async function handler(req, res) {
  // Passwortprüfung für diese spezifische Route
  const password = req.headers['x-auth-password']

  if (!password) {
    return res.status(401).send('Unauthorized: Password required')
  }
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).send('Forbidden: Invalid password')
  }

  let dbConnection
  try {
    dbConnection = await connectToDatabase()
    const collection = dbConnection.collection('guests')

    if (req.method === 'GET') {
      // Für Analyse: Alle Gäste abrufen (ungefiltert)
      const guests = await collection.find({}).toArray()
      res.status(200).json(guests)
    } else {
      // Für /api/analysis sind nur GET-Anfragen erlaubt
      res.status(405).json({ message: 'Method not allowed for /api/analysis' })
    }
  } catch (error) {
    console.error('Fehler in der API-Route /api/analysis:', error)
    res.status(500).json({ message: 'Serverfehler: ' + error.message })
  }
}
