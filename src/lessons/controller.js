import { ok } from "../utils/http/httpService.js";
import { toLesson, toLessonResponse, toLessonsResponse } from "./mapper.js";
import * as LessonService from "./service.js";
import * as UserService from "../users/service.js";

import { toSlot } from "../slots/mapper.js";

export const removePartecipant = async (req, res) => {
    const { id, uid } = req.params;

    const updatedLesson = await LessonService.removePartecipant(id, uid);

    return ok(res, toLessonResponse(updatedLesson))
}

export const addPartecipant = async (req, res) => {
    const lessonId = req.params.id

    const userDTO = req.body;

    let lesson;
    if (!userDTO.id) {
        const newUser = await UserService.create(userDTO)

        lesson = await LessonService.addPartecipant(lessonId, newUser._id)
    } else {
        lesson = await LessonService.addPartecipant(lessonId, userDTO.id)
    }

    return ok(res, toLessonResponse(lesson))
}

export const getAllByDate = async (req, res) => {
    const lessons = await LessonService.getByDate(req.params.date);

    return ok(res, toLessonsResponse(lessons));
}

export const getById = async (req, res) => {
    const l = await LessonService.getLesson(req.params.id);

    return ok(res, toLessonResponse(l));
}

export const update = async (req, res) => {
    const lessonDTO = req.body;

    const slotDTO = {
        id: lessonDTO.slot_id,
        start: lessonDTO.start,
        end: lessonDTO.end
    }

    const slot = toSlot(slotDTO)
    const lesson = toLesson(lessonDTO);

    const updatedLesson = await LessonService.update(lesson, slot);

    return ok(res, toLessonResponse(updatedLesson));
}

export const create = async (req, res) => {
    const dto = req.body;

    const lesson = await LessonService.create(toLesson(dto))

    return ok(res, lesson)
}

export const remove = async (req, res) => {
    return ok(res, await LessonService.remove(req.params.id))
}