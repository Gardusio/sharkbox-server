import { Schema, model } from 'mongoose';

const schema = new Schema({
    dow: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    corso: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        require: true
    }
});

const Slots = model('slots', schema);

export default Slots;
