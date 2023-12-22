import dayjs from 'dayjs'
import * as Repository from "./repository.js"

export const create = async (messageText) => {
    const date = dayjs().toString()
    const message = {
        text: messageText,
        date: date
    }
    return await Repository.save(message);
}

export const getAll = async () => {
    const retrieved = await Repository.findAll();
    const messages = retrieved.map(m => ({ _id: m._id, text: m.text, date: new Date(m.date) }))
    messages.sort((m, m1) => m1.date - m.date)
    return messages;
}


export const remove = async (id) => {
    return await Repository.remove(id)
}