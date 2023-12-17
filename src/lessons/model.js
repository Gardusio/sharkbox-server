import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
    corso: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    type: {
        type: String,
        enum: ['PLANNED', 'SINGLE'],
        required: true
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'slots'
    },
    start: {
        type: String
    },
    end: {
        type: String,
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
    },
    data: {
        type: String,
        required: true
    },
    partecipanti: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    coda: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

const Lessons = model('lessons', lessonSchema);

export default Lessons;
