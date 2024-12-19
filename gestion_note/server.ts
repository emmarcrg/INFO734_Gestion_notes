import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { MongoClient, Db, Collection } from 'mongodb';
import bcrypt from 'bcrypt';

const app: Application = express();
const port: number = 3000;

// Lire le fichier login.txt
const loginFilePath: string = path.join(__dirname, 'login.txt');
const loginFileContent: string = fs.readFileSync(loginFilePath, 'utf8');

// Extraire l'utilisateur et le mot de passe
const [user, password]: string[] = loginFileContent.split('\n').map(line => line.trim());

// MongoDB connection details
const address: string = "emmaxelle.ygq51.mongodb.net";
console.log('User : ', user);
console.log('Mot de passe : ', password);

// MongoDB URI with authentication
const uri: string = `mongodb://${user}:${password}@${address}:27017/?authMechanism=DEFAULT&authSource=admin`;

// Initialize MongoDB client
const client: MongoClient = new MongoClient(uri);

// Database and collection variables
let usersCollection: Collection;

// Fonction pour se connecter à MongoDB
async function connectToMongo(): Promise<void> {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db: Db = client.db('Gestion_notes'); // Remplacez 'Gestion_notes' par le nom de votre base de données
        usersCollection = db.collection('eleves'); // Remplacez 'eleves' par le nom de votre collection
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

// Fonction de connexion
async function authenticateUser(username: string, password: string): Promise<boolean> {
    try {
        const user = await usersCollection.findOne({ username });
        if (!user) {
            console.log('Invalid username');
            return false;
        }

        const isMatch = await bcrypt.compare(password, user['password']);
        if (!isMatch) {
            console.log('Invalid password');
            return false;
        }

        console.log('Login successful');
        return true;
    } catch (err) {
        console.error('Error during login', err);
        return false;
    }
}

// Route d'authentification
app.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const isAuthenticated = await authenticateUser(username, password);

        if (isAuthenticated) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});