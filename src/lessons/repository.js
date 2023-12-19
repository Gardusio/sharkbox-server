import Lessons from "./model.js"
import mongoose from "mongoose";

export const save = async (lesson) => {
    return await Lessons.create(lesson);
}

export const remove = async (id) => {
    return await Lessons.findByIdAndDelete(id);
}

export const update = async (lesson) => {
    const { _id, updatedLesson } = lesson;

    return await Lessons.findOneAndUpdate({ id: lesson.id }, { ...updatedLesson }, { new: true })
        .populate("coda")
        .populate("partecipanti");
}

export const pullFromPartecipantAndCoda = async (lessonId, uid) => {
    return await Lessons
        .findOneAndUpdate(
            { id: lessonId },
            {
                $pull: {
                    partecipanti: uid,
                    coda: uid,
                }
            },
            { new: true })
        .populate("coda")
        .populate("partecipanti");
}

export const findAllBySlotId = async (id) => {
    return await Lessons.find({ slot: id })
}

export const findAllByCourseId = async (id) => {
    return await Lessons.find({ corso: id })
}

export const findAllByDate = async (date) => {
    return await Lessons.find({ data: date })
}

export const findAllByDateWithSlot = async (date) => {
    return await Lessons
        .find({ data: date })
        .populate({
            path: 'slot',
            match: { type: "PLANNED" }
        })
}

export const findAllByDateWithSlotAndCourseAndUsers = async (date) => {
    return await Lessons.aggregate([
        { $match: { data: date } }, // Match based on date
        {
            $lookup: {
                from: 'courses',
                localField: 'corso',
                foreignField: '_id',
                as: 'corso'
            }
        },
        {
            $lookup: {
                from: 'slots',
                let: { slotId: '$slot', isPlanned: { $eq: ['$type', 'PLANNED'] } },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$_id', '$$slotId'] },
                                    '$$isPlanned'
                                ]
                            }
                        }
                    }
                ],
                as: 'slot'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'partecipanti',
                foreignField: '_id',
                as: 'partecipanti'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'coda',
                foreignField: '_id',
                as: 'coda'
            }
        },
        {
            $addFields: {
                corso: { $arrayElemAt: ['$corso', 0] },
                slot: { $arrayElemAt: ['$slot', 0] }
            }
        },
        {
            $project: {
                "corso.nome": 1,
                "corso._id": 1,
                "slot._id": 1,
                "slot.start": 1,
                "slot.end": 1,
                type: 1,
                start: 1,
                end: 1,
                anticipo_disdetta: 1,
                anticipo_prenotazione: 1,
                max_partecipanti: 1,
                data: 1,
                "partecipanti._id": 1,
                "partecipanti.name": 1,
                "coda.name": 1,
                "coda._id": 1
            }
        }
    ]);
}

export const findByIdWithSlotAndCourseAndUsers = async (id) => {
    return (await Lessons.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'courses',
                localField: 'corso',
                foreignField: '_id',
                as: 'corso'
            }
        },
        {
            $lookup: {
                from: 'slots',
                let: { slotId: '$slot', isPlanned: { $eq: ['$type', 'PLANNED'] } },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$_id', '$$slotId'] },
                                    '$$isPlanned'
                                ]
                            }
                        }
                    }
                ],
                as: 'slot'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'partecipanti',
                foreignField: '_id',
                as: 'partecipanti'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'coda',
                foreignField: '_id',
                as: 'coda'
            }
        },
        {
            $addFields: {
                corso: { $arrayElemAt: ['$corso', 0] },
                slot: { $arrayElemAt: ['$slot', 0] }
            }
        },
        {
            $project: {
                "corso.nome": 1,
                "corso._id": 1,
                "slot._id": 1,
                "slot.start": 1,
                "slot.end": 1,
                type: 1,
                start: 1,
                end: 1,
                anticipo_disdetta: 1,
                anticipo_prenotazione: 1,
                max_partecipanti: 1,
                data: 1,
                "partecipanti._id": 1,
                "partecipanti.name": 1,
                "coda.name": 1,
                "coda._id": 1
            }
        }
    ]))[0];
}


/*
export const findByIdAndSlotIdWithSlotAndCourseName = (id, slot_id) => {

    const query = `
        SELECT lessons.id AS lessons_id, lessons.*, slots.start, slots.end, slots.id, courses.nome
        FROM lessons
        JOIN slots ON lessons.slot_id = slots.id
        JOIN courses ON lessons.course_id = courses.id
        WHERE lessons.id = '${id}' AND lessons.slot_id = '${slot_id}'
    `
    return dbGet(query, []);
}
*/

export const findById = async (id) => {
    return await Lessons.findById(id);
};

export const removeBySlot = async (slotId) => {
    return await Lessons.deleteMany({ slot: slotId });
}

export const removeByCourse = async (courseId) => {
    return await Lessons.deleteMany({ corso: courseId });
}