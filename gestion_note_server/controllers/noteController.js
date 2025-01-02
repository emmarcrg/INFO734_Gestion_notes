import { Note } from '../models/noteModel.js';

// Ajouter une note
export const ajouterNote = async (req, res) => {
  const { eleveId, matiereId, note } = req.body;
  try {
    const nouvelleNote = new Note({
      eleve: eleveId,
      matiere: matiereId,
      note,
    });
    const noteSauvegardee = await nouvelleNote.save();
    res.status(201).json(noteSauvegardee);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’ajout de la note.' });
  }
};

// Récupérer toutes les notes d'un élève
export const getNotesEleve = async (req, res) => {
  try {
    const notes = await Note.find({ eleve: req.params.eleveId }).populate('matiere');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des notes.' });
  }
};
