import {UE} from '../models/ueModel.js';

// Récupérer toutes les ues
export const getUE = async (req, res) => {
 try {
    console.log('Connexion à MongoDB et récupération des UE...');
    const ues = await UE.find();
    console.log('UEs récupérées :', ues);
    res.json(ues);
  } catch (err) {
    console.log('Erreur lors de la récupération des ues :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des ues.' });
  }
};
