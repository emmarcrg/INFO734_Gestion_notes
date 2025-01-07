import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: 'Eleve', required: true },
  matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
  note: { type: Number, required: true },
}, { timestamps: true });

export const Note = mongoose.model('Note', noteSchema);
