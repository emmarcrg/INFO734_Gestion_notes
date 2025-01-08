import { Connexion } from '../models/connexionModel.js';

// Récupérer toutes les informations d'un utilisateur
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

// Récupérer une personne par login
export const getPersonneByLogin = async (req, res) => {
  const { login } = req.params;
  try {
    const personne = await Connexion.findOne({ login });
    if (!personne) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.json({ message: 'Utilisateur trouvé.', user: personne });
  } catch (err) {
    console.log('Erreur lors de la récupération de l\'utilisateur :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
};
