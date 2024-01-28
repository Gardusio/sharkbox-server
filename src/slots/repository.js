import Slots from "./model.js"

export const save = async (slot) => await Slots.create(slot);

export const findById = async (id) => await Slots.findById(id);

export const remove = async (id) => await Slots.findByIdAndDelete(id);

export const removeByCourse = async (id) => await Slots.deleteMany({ corso: id })

export const update = async (slot) => {
    const { _id, ...updatedSlot } = slot;
    return await Slots.findOneAndUpdate({ id: _id }, { ...updatedSlot }, { new: true })
}

export const findAllByCourseId = async (id) => await Slots.find({ corso: id })
