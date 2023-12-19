import * as Repository from "./repository.js";
import * as SlotService from "../slots/service.js"
import dayjs from 'dayjs'

export const removePartecipant = async (id, uid) => {
    const updated = await Repository.pullFromPartecipantAndCoda(id, uid);
    console.log("updated", updated)
    return updated;
}

export const remove = async (id) => {
    return await Repository.remove(id);
}

export const update = async (lesson, slot) => {
    let toUpdate = lesson;

    if (lesson.type === "PLANNED") {
        const existingSlot = await SlotService.getById(slot._id);

        if (existingSlot &&
            slot.start != existingSlot.start || slot.end != existingSlot.end) {

            toUpdate = {
                ...lesson,
                slot: null,
                type: "SINGLE",
                start: slot.start,
                end: slot.end
            }
        }
    }

    const updated = await Repository.update(toUpdate)

    if (!updated || updated == 0) throw new Error("Lesson not found");

    return lesson;
}

export const addPartecipant = async (id, userId) => {
    const lesson = await Repository.findById(id);

    if (lesson.max_partecipanti === lesson.partecipanti.length) {
        return await Repository.update({ coda: [...lesson.coda, userId] })
    }

    return await Repository.update({ partecipanti: [...lesson.partecipanti, userId] })
}

export const getLesson = async (id) => {

    const lesson = await Repository.findByIdWithSlotAndCourseAndUsers(id)

    if (!lesson) throw new Error("Lesson not found");

    return lesson;
}

export const removeBySlot = async (slotId) => {
    return await Repository.removeBySlot(slotId)
}


const computeEndDateIfAbsent = (endDate) => {
    if (!endDate) {
        return dayjs().add(6, 'month')
    }

    return dayjs(endDate);
}

const getDayIdx = (day) => {
    return ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].indexOf(day);
}


const createFromUntil = async (course, from, slot) => {

    const { _id, max_partecipanti, anticipo_prenotazione, anticipo_disdetta } = course;

    let lessonDate = from
    const until = course.slots_end_date

    while (lessonDate.isBefore(computeEndDateIfAbsent(until))) {
        const lesson = {
            slot: slot._id,
            corso: _id,
            data: dayjs(lessonDate).format("DD/MM/YYYY"),
            max_partecipanti,
            anticipo_disdetta,
            anticipo_prenotazione,
            type: "PLANNED"
        };

        await Repository.save(lesson);

        lessonDate = lessonDate.add(1, 'week');
    }
}

const getStartingDate = (dow) => {
    const dayIndex = getDayIdx(dow) + 1;
    let lessonDate = dayjs().day(dayIndex);

    if (lessonDate.isBefore(dayjs())) {
        lessonDate = lessonDate.add(1, 'week')
    }

    return lessonDate
}


const getFormattedDate = (ddmmyyyy) => {
    const split = ddmmyyyy.split("/");
    const mmddyyyy = split[1] + "/" + split[0] + "/" + split[2];
    const date = dayjs(mmddyyyy)
    return date;
}

export const updateScheduledLessons = async (course, slots) => {
    for (const slot of slots) {

        const existingDates = (await Repository.findAllBySlotId(slot._id))
            .map(lesson => getFormattedDate(lesson.data))

        existingDates.sort((d, d1) => d.isBefore(d1) ? -1 : 1)

        const lastDate = existingDates[existingDates.length - 1]

        const from = lastDate ? lastDate.add(1, 'week') : getStartingDate(slot.dow);

        await createFromUntil(course, from, slot)
    }
}

export const createScheduledLessons = async (course, slots) => {
    for (const slot of slots) {
        const from = getStartingDate(slot.dow);

        await createFromUntil(course, from, slot)
    }
}

export const removeByCourse = async (courseId) => {
    return await Repository.removeByCourse(courseId);
}

export const getByDate = async (date) => {
    const searchDate = date.replaceAll("-", "/");
    const l = await Repository.findAllByDateWithSlotAndCourseAndUsers(searchDate);
    return l
}

export const create = async (lesson) => {
    const saved = await Repository.save(lesson);
    return saved;
}

