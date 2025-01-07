import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  note: { type: Number, required: true },
  coef: { type: Number, required: true },
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: 'Eleve', required: true },
  matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
}, { timestamps: true });

export const Note = mongoose.model('Note', noteSchema, 'note');
export default Note;
