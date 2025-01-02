import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { MongoClient, Db, Collection } from 'mongodb';

const app = express();
const port = 3000;

// MongoDB connection details
const address = "emmaxelle.ygq51.mongodb.net";
const uri = `mongodb+srv://${address}`;
console.log('MongoDB URI: ', uri);

// Initialize MongoDB client
const client = new MongoClient(uri);

// Database and collection variables
let usersCollection: Collection;

// Fonction pour se connecter à MongoDB
async function connectToMongo(): Promise<void> {
    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB');
        const db: Db = client.db('Gestion_notes'); // Remplacez 'Gestion_notes' par le nom de votre base de données
        usersCollection = db.collection('eleves'); // Remplacez 'eleves' par le nom de votre collection
        console.log('Database and collection initialized');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

// Appel de la fonction pour se connecter à MongoDB
connectToMongo().catch(console.error);

// Middleware pour parser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});