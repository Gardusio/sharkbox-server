import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
    },
    hash: {
        type: String,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', "GUEST"],
    }
});

const Users = model('users', userSchema);

export default Users;
