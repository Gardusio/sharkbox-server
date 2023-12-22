import { findById, save, findAll } from "./repository.js";
import { UserNotFound } from "./errors.js";
import bcrypt from "bcryptjs"

export const getById = async (id) => {
    const user = await findById(id)

    if (!user) throw new UserNotFound();

    return user;
}


export const getAll = async () => {
    return await findAll();
}


const hash = async (pass) => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = await bcrypt.hash(pass, salt);

    return hashedPassword;
}

export const create = async (userForm) => {
    let user;

    let phone = userForm.phone ? userForm.phone.replaceAll(" ", "") : null

    phone = phone.includes("+39") ? phone.substring(1) : "39" + phone

    if (!userForm.email || !userForm.password) {
        user = await save({
            name: userForm.name,
            role: "GUEST",
            email: "GUEST"
        });
    }
    else {
        user = await save({
            ...userForm,
            hash: await hash(userForm.password),
            role: "USER",
            phone: phone,
        });
    }

    if (!user) throw new Error("Could not create user")

    return user;
}