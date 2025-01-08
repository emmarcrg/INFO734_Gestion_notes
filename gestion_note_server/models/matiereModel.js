import mongoose from 'mongoose';

const matiereSchema = new mongoose.Schema({
  code: { type: String, required: true },
  nom: { type: String, required: true },
  coef: { type: String, required: true },
  id_ue: { type: mongoose.Schema.Types.ObjectId, ref: 'UE' },
},);

export const Matiere = mongoose.model('Matiere', matiereSchema, 'matiere');
export default Matiere;
