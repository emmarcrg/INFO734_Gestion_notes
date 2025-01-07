import express from 'express';
import { getPersonnes } from '../controllers/connexionController.js';

const router = express.Router();

// Ajouter une matière
//router.post('/ajouterMatiere', ajouterMatiere);

// Récupérer toutes les matières
router.get('/getPersonnes', getPersonnes);

export default router;
