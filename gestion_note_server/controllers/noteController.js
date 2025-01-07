import { Note } from '../models/noteModel.js';

// Ajouter une note
export const ajouterNote = async (req, res) => {
  const { id_eleve, id_matiere, note, coef } = req.body;
  console.log('Données reçues:', { id_eleve, id_matiere, note, coef });
  try {
    const nouvelleNote = new Note({
      id_eleve: id_eleve,
      id_matiere: id_matiere,
      note,
      coef
    });
    const noteSauvegardee = await nouvelleNote.save();
    console.log('Note sauvegardée:', noteSauvegardee);
    res.status(201).json(noteSauvegardee);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l’ajout de la note.' });
  }
};

// Récupérer toutes les notes d'un élève
export const getNotesEleve = async (req, res) => {
  try {
    const { id_eleve } = req.params;
    const notes = await Note.find({ id_eleve }).populate('id_matiere')
    // Vérifier si des notes existent
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'Aucune note trouvée pour cet élève.' });
    }
    // Retourner les notes
    res.json(notes);
  } catch (err) {
    console.error(err); // Log pour déboguer
    res.status(500).json({ error: 'Erreur lors de la récupération des notes.' });
  }
};
