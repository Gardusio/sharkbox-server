import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    text: {
        type: String,
    },
    date: {
        type: String,
    },
});

const Messages = model('messages', messageSchema);

export default Messages;
