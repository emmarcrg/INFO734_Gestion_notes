import express from 'express';
import { getSemestres } from '../controllers/semestreController.js';

const router = express.Router();


// Récupérer toutes les ues
router.get('/getSemestres', getSemestres);

export default router;
