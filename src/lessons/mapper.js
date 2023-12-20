import { toUsersResponse } from "../users/mapper.js"

export const toLessonsResponse = (lessons) => {
    return lessons.map(l => toLessonResponse(l))
}

export const toLessonResponse = (l) => {
    const {
        max_partecipanti, anticipo_prenotazione, anticipo_disdetta,
        _id, corso, type,
        slot, data,
        coda, partecipanti
    } = l

    const codaResponse = toUsersResponse(coda);
    const partecipantiResponse = toUsersResponse(partecipanti);

    return {
        id: _id,
        max_partecipanti, anticipo_prenotazione, anticipo_disdetta, type,
        nome: corso.nome,
        course_id: corso._id,
        date: data,
        slot_id: slot ? slot._id : null,
        start: slot ? slot.start : l.start,
        end: slot ? slot.end : l.end,
        dow: slot ? slot.dow : null,
        coda: codaResponse,
        partecipanti: partecipantiResponse
    }
}

export const toLesson = (lessonDTO) => {
    const {
        type,
        max_partecipanti,
        course_id,
        date,
        anticipo_prenotazione,
        anticipo_disdetta,
        id,
        slot_id,
        start,
        end, coda,
        partecipanti } = lessonDTO

    return {
        data: date,
        max_partecipanti,
        corso: course_id,
        anticipo_prenotazione,
        anticipo_disdetta,
        id,
        slot: slot_id,
        type,
        start,
        end,
        coda: coda ? coda.map(p => p.id) : [],
        partecipanti: partecipanti ? partecipanti.map(p => p.id) : []
    }
}
