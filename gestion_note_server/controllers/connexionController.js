import { Connexion } from '../models/connexionModel.js';


// Ajouter une personne => à faire
/*export const ajouterMatiere = async (req, res) => {
  const { id, login, mdp_crypte } = req.body;
  try {
    const nouvelleMatiere = new Matiere({ nom, coef, ue });
    const matiereSauvegardee = await nouvelleMatiere.save();
    res.status(201).json(matiereSauvegardee);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’ajout de la matière.' });
  }
};*/

// Récupérer tles informations d'un utilisateur
export const getPersonnes = async (req, res) => {
  try {
    console.log('Connexion à MongoDB et récupération des personnes...');
    const personnes = await Connexion.find();
    console.log('Personnes récupérées :', personnes);
    res.json(personnes);
  } catch (err) {
    console.log('Erreur lors de la récupération des personnes :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des personnes.' });
  }
};
