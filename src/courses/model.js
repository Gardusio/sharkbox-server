import { Schema, model } from 'mongoose';

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
    },
    slots_end_date: {
        type: String
    },
    slots_start_date: {
        type: String
    },
    anticipo_disdetta: {
        type: Number,
        default: 30
    },
    anticipo_prenotazione: {
        type: Number,
        default: 48
    },
    max_partecipanti: {
        type: Number,
        default: 20
    }
});

const Courses = model('courses', schema);

export default Courses;
