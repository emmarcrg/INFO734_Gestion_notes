import {UE} from '../models/ueModel.js';

// Récupérer les ue en fonction d'un id de semestre
export const getUE = async (req, res) => {
 try {
    const { id_semestre } = req.params; // on récupère l'id_semestre passé en paramètre
    console.log('id_semestre reçu :', id_semestre);
    if (!id_semestre) {
      return res.status(400).json({ error: 'id_semestre invalide.' });
    }
    // on récupère les ues correspondant à l'id_ue passé
    const ues = await UE.find({
      'id_semestre': id_semestre
    });
        
    console.log('UEs récupérées :', ues);
    res.json(ues);
  } catch (err) {
    console.log('Erreur lors de la récupération des ues :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des ues.' });
  }
};
