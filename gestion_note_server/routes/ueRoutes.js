import express from 'express';
import { getUE } from '../controllers/ueController.js';

const router = express.Router();


// Récupérer toutes les ues
router.get('/getUE/:id_semestre', getUE);

export default router;
