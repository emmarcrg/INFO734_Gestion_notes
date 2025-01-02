import express from 'express';
import { ajouterMatiere, getMatieres } from '../controllers/matiereController.js';

const router = express.Router();

// Ajouter une matière
router.post('/', ajouterMatiere);

// Récupérer toutes les matières
router.get('/', getMatieres);

export default router;
