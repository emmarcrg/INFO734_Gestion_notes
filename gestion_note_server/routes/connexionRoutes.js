import express from 'express';
import { getPersonnes, getPersonneByLogin } from '../controllers/connexionController.js';

const router = express.Router();

// Ajouter une matière
//router.post('/ajouterMatiere', ajouterMatiere);

// Récupérer toutes les matières
router.get('/getPersonnes', getPersonnes);

// Authentification 
router.get('/getPersonne/:login', getPersonneByLogin);

export default router;