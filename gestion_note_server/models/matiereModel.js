import mongoose from 'mongoose';

const matiereSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  coef: { type: Number, required: true },
  ue: { type: String, required: true },
}, { timestamps: true });

export const Matiere = mongoose.model('Matiere', matiereSchema);
