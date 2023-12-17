import bcrypt from "bcryptjs"
import { BadCredentials } from "./authErrors.js";
import { findByEmail } from "../users/repository.js";

const authenticateRequest = async (email, password, callback) => {
    try {
        const user = await findByEmail(email)

        if (!user || !await bcrypt.compare(password, user.hash)) throw new BadCredentials();

        return callback(null, user);
    } catch (err) {
        return callback(null, false, { message: err.message });
    }
}

export { authenticateRequest }