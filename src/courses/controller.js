import { ok } from "../utils/http/httpService.js";
import * as CourseService from "./service.js";
import * as SlotService from "../slots/service.js";
import * as LessonService from "../lessons/service.js";
import { toCourseResponse, toCourse, toCourseListResponse } from "./mapper.js";
import { toSlots } from "../slots/mapper.js";


export const updateCourse = async (req, res) => {
    const courseDTO = req.body;

    const course = toCourse(courseDTO);

    const updatedCourse = await CourseService.update(course);

    const slots = toSlots(courseDTO, course._id)
    console.log(slots)

    const existingSlots = await SlotService.updateAll(slots.filter(slot => slot._id));
    console.log(existingSlots)
    const newSlots = await SlotService.createAll(slots.filter(slot => !slot._id));

    await LessonService.createScheduledLessons(updatedCourse, newSlots);
    await LessonService.updateScheduledLessons(updatedCourse, existingSlots);

    return ok(res, toCourseResponse(updatedCourse, [...existingSlots, ...newSlots]))
}

export const createCourse = async (req, res) => {
    const courseDTO = req.body;

    const newCourse = toCourse(courseDTO);

    const savedCourse = await CourseService.create(newCourse);
    const slots = toSlots(courseDTO, savedCourse._id)

    const savedSlots = await SlotService.createAll(slots);

    await LessonService.createScheduledLessons(savedCourse, savedSlots);

    return ok(res, savedCourse.id)
}

export const getCourseById = async (req, res) => {
    const id = req.params.id
    const course = await CourseService.getById(id)

    return ok(res, toCourseResponse(course, course.slots));
}

export const getAllCourses = async (req, res) => {
    return ok(res, toCourseListResponse(await CourseService.getAll()));
}

export const removeCourse = async (req, res) => {
    const id = req.params.id
    Promise.all([
        await SlotService.removeByCourse(id),
        await LessonService.removeByCourse(id),
    ])
    await CourseService.remove(id)
    return ok(res);
}