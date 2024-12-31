import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import bootstrap from './src/main.server';

const app = express();

// Dossiers pour le SSR
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

// Angular SSR Engine
const commonEngine = new CommonEngine();

app.set('view engine', 'html');
app.set('views', browserDistFolder);

// Middleware pour servir les fichiers statiques du frontend Angular
app.use(express.static(browserDistFolder, { maxAge: '1y', index: 'index.html' }));

// Routes pour le SSR Angular
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

// Lancement du serveur SSR
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Frontend SSR server is running at http://localhost:${port}`);
});
