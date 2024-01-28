import { toSlotsResponse } from "../slots/mapper.js";
import dayjs from 'dayjs'


export const toCourseResponse = (course, slots) => {
    const groupedSlots = toSlotsResponse(slots)

    const mapped = {
        ...course,
        id: course._id,
        slots: groupedSlots
    }

    return mapped;
}

const computeEndDateIfAbsent = (endDate) => {
    if (!endDate) {
        return dayjs().add(3, 'month')
    }

    return dayjs(endDate);
}

export const toCourseListResponse = (courses) => {
    const mapped = courses.map(c => ({
        id: c._id,
        nome: c.nome,
        max_partecipanti: c.max_partecipanti,
        anticipo_disdetta: c.anticipo_disdetta,
        anticipo_prenotazione: c.anticipo_prenotazione,
        slots_end_date: c.slots_end_date,
        colore: c.colore
    }))

    return mapped;
}

export const toCourse = (courseDTO) => {
    let course = {
        nome: courseDTO.nome,
        max_partecipanti: courseDTO.max_partecipanti,
        anticipo_prenotazione: courseDTO.anticipo_prenotazione,
        anticipo_disdetta: courseDTO.anticipo_disdetta,
        created_at: dayjs().toString(),
        slots_end_date: computeEndDateIfAbsent(courseDTO.slots_end_date).toString(),
        slots_start_date: courseDTO.slots_start_date ? courseDTO.slots_start_date.toString() : dayjs().toString(),
        colore: courseDTO.colore
    }

    if (courseDTO.id) {
        course = {
            _id: courseDTO.id,
            ...course
        }
    }

    return course;
}