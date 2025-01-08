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

// Récupérer les matières en fonction de l'id d'un ue
export const getMatieres = async (req, res) => {
  try {
    const { id_ue } = req.params; // on récupère l'id_ue passé en paramètre
    console.log('Recherche de matière pour id_ue :', id_ue);
    if (!id_ue) {
      return res.status(400).json({ error: 'id_ue invalide.' });
    }

    // on récupère les matières correspondant à l'id_ue passé
    const matieres = await Matiere.find({
      'id_ue': id_ue
    });

    console.log('Matières récupérées :', matieres);
    res.json(matieres);
  } catch (err) {
    console.log('Erreur lors de la récupération des matières :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des matières.' });
  }
};


