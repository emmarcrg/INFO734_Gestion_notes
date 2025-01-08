import mongoose from 'mongoose';

const semestreSchema = new mongoose.Schema({
    code: { type: String, required: true },
    nom: { type: String, required: true },
}, { timestamps: true });

export const Semestre = mongoose.model('Semestre', semestreSchema, 'semestre');
export default Semestre;
