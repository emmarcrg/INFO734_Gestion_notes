import { Matiere } from '../models/matiereModel.js';
// import mongoose from 'mongoose';

// Ajouter une matière
export const ajouterMatiere = async (req, res) => {
  const { nom, coef, ue } = req.body;
  try {
    const nouvelleMatiere = new Matiere({ nom, coef, ue });
    const matiereSauvegardee = await nouvelleMatiere.save();
    res.status(201).json(matiereSauvegardee);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’ajout de la matière.' });
  }
};

// Récupérer toutes les matières
export const getMatieres = async (req, res) => {
  try {
    console.log('Connexion à MongoDB et récupération des matières...');
    const matieres = await Matiere.find();
    console.log('Matières récupérées :', matieres);
    res.json(matieres);
  } catch (err) {
    console.log('Erreur lors de la récupération des matières :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des matières.' });
  }
};
