import Users from './model.js';

export const save = async (user) => {
    return await Users.create(user)
}

export const findById = async (id) => {
    return await Users.findById(id);
}


export const findByEmail = async (userEmail) => {
    return await Users.findOne({ email: userEmail });
}

export const findAll = async () => await Users.find();
