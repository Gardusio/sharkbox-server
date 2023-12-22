import Messages from "./model.js";

export const findAll = async () => {
    return await Messages.find();
}

export const save = async (message) => {
    return await Messages.create(message);
}

export const remove = async (id) => {
    return await Messages.findByIdAndDelete(id);
}