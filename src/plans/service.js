import dayjs from "dayjs";
import { CourseNotFound } from "./errors.js";
import * as CourseRepository from "./repository.js";


export const remove = async (id) => {
    return await CourseRepository.remove(id)
}

export const update = async (course) => {
    const updated = await CourseRepository.update(course)

    if (!updated || updated == 0) throw new CourseNotFound();

    return course;
}

export const getById = async (id) => {
    const course = await CourseRepository.findById(id)

    if (!course) throw new CourseNotFound();

    return course;
}

export const getAll = async () => {
    const courses = await CourseRepository.findAll();
    // This should probably be done DB-side, but there will be roughly 20 courses at any given time.
    courses.sort((c, c1) => (dayjs(c.created_at) < dayjs(c1.created_at) ? 1 : -1))

    return courses;
}


export const create = async (newCourse) => {

    const course = await CourseRepository.save(newCourse);

    // TODO: Better error
    if (!course) throw new Error()

    return course
}