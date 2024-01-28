/** 
 * SLOT SERVICE 
 * 
*/
import Slots from './model.js';
import * as Repository from './repository.js'

export const getSlotsByCourse = async (courseId) => {
    await Slots.find({ corso: courseId })
    return await Repository.findAllByCourseId(courseId);
}

export const remove = async (slotId) => {
    return await Repository.remove(slotId);
}

export const removeByCourse = async (courseId) => {
    return await Repository.removeByCourse(courseId);
}

export const create = async (slot) => {
    return await Repository.save(slot);
}

export const createAll = async (slots) => {
    return Promise.all(
        slots.map(async slot => await create(slot))
    )
}

export const update = async (slot) => {
    return await Repository.update(slot);
}

export const updateAll = async (slots) => {
    return await Promise.all(slots.map(async (slot) => await update(slot)))
}

export const getById = async (id) => await Repository.findById(id)