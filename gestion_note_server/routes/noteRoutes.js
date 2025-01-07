import express from 'express';
import { ajouterNote, getNotesEleve } from '../controllers/noteController.js';

const router = express.Router();

// Ajouter une note
router.post('/ajouterNote', ajouterNote);

// Récupérer toutes les notes d'un élève
router.get('/getNotesEleve/:id_eleve', getNotesEleve);

export default router;
