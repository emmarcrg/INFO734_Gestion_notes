import mongoose from 'mongoose';

const eleveSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  identifiant: { type: String, unique: true, required: true },
  mdp: { type: String, required: true }, // mdp crypté
  reponse: { type: String, required: true }, // réponse cryptée
}, { timestamps: true });

export const Eleve = mongoose.model('Eleve', eleveSchema);
