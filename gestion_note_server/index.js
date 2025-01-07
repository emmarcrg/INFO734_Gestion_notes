import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import fs from 'fs';
import noteRoutes from './routes/noteRoutes.js';
import matiereRoutes from './routes/matiereRoutes.js';
import ueRoutes from './routes/ueRoutes.js';
import semestreRoutes from './routes/semestreRoutes.js';
import connexionRoutes from './routes/connexionRoutes.js';

const filePath = join(dirname(fileURLToPath(import.meta.url)), 'login.txt');
let mongoUri = '';

try {
  const credentials = fs.readFileSync(filePath, 'utf8').split('\n');
  const username = credentials[0].trim();
  const password = credentials[1].trim();
  mongoUri = `mongodb+srv://${username}:${password}@emmaxelle.ygq51.mongodb.net/Gestion_notes?retryWrites=true&w=majority`;
} catch (err) {
  console.error('Erreur de lecture du fichier login.txt :', err);
  process.exit(1);
}

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Routes API
app.use('/notes', noteRoutes);
app.use('/matieres', matiereRoutes);
app.use('/ues', ueRoutes);
app.use('/semestres', semestreRoutes);
app.use('/connexion', connexionRoutes);

// Rediriger toutes les autres routes vers Angular
app.get('*', (req, res) => {
  res.send("yo c'est moi");
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
