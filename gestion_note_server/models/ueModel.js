import mongoose from 'mongoose';

const ueSchema = new mongoose.Schema({
    code: { type: String, required: true },
    nom: { type: String, required: true },
    coef: { type: Number, required: true },
    id_semestre: { type: mongoose.Schema.Types.ObjectId, ref: 'Semestre', required: true },
}, { timestamps: true });

export const UE = mongoose.model('Ue', ueSchema, 'ue');
export default UE;