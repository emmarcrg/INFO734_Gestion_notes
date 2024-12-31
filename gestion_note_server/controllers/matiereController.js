import { Matiere } from '../models/matiereModel.js';

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
    const matieres = await Matiere.find();
    res.json(matieres);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des matières.' });
  }
};
