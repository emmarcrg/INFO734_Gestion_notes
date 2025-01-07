import {Semestre} from '../models/semestreModel.js';

// Récupérer tous les semestres
export const getSemestres = async (req, res) => {
 try {
    console.log('Connexion à MongoDB et récupération des semestres...');
    const semestres = await Semestre.find();
    console.log('Semestres récupérées :', semestres);
    res.json(semestres);
  } catch (err) {
    console.log('Erreur lors de la récupération des semestres :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des semestres.' });
  }
};
