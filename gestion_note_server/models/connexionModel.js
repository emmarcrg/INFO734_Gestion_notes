import mongoose from 'mongoose';

const connexionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  login: { type: String, required: true },
  mdp_crypte: { type: String, required: true },
},);

export const Connexion = mongoose.model('Connexion', connexionSchema, 'eleve');
export default Connexion;
