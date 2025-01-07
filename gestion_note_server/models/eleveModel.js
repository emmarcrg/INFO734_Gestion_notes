import mongoose from 'mongoose';

const eleveSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  mdp_crypte: { type: String, required: true },
  reponse_cryptee: { type: String, required: true },
  identifiant: { type: String, unique: true, required: true },
}, { timestamps: true });

export const Eleve = mongoose.model('Eleve', eleveSchema, 'eleve');
export default Eleve;
