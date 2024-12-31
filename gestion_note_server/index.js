import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import fs from 'fs';
import bootstrap from '../gestion_note/src/main.server';
import noteRoutes from './routes/noteRoutes.js';
import matiereRoutes from './routes/matiereRoutes.js';

const filePath = join(dirname(fileURLToPath(import.meta.url)), 'login.txt');
let mongoUri = '';

try {
  const credentials = fs.readFileSync(filePath, 'utf8').split('\n');
  const username = credentials[0].trim();
  const password = credentials[1].trim();
  mongoUri = `mongodb+srv://${username}:${password}@emmaxelle.ygq51.mongodb.net/gestion_notes?retryWrites=true&w=majority`;
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
app.use('/api/notes', noteRoutes); // Utiliser les routes des notes
app.use('/api/matieres', matiereRoutes); // Utiliser les routes des matières

// Dossiers Angular SSR
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../gestion_note/dist/browser');
const indexHtml = join(serverDistFolder, '../gestion_note/dist/index.server.html');
const commonEngine = new CommonEngine();

app.use(express.static(browserDistFolder, { maxAge: '1y' }));

app.get('**', (req, res, next) => {
  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
