import mongoose from "mongoose";
import Courses from "./model.js";

export const save = async (course) => {
    const saved = await Courses.create(course)
    return saved;
}

export const remove = async (id) => {
    return await Courses.findByIdAndDelete(id)
}

export const update = async (course) => {
    return await Courses.findOneAndUpdate({ id: course.id }, { ...course })
}

export const findById = async (id) => {
    return (await Courses.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'slots',
                localField: '_id',
                foreignField: 'corso',
                as: 'slots'
            }
        },
    ]))[0];
};

export const findAll = async () => {
    return await Courses.find();
};
