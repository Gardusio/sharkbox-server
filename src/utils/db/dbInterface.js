import { db } from "../../../server.js";
import { DBError } from "./dbErrors.js";


const fetchDataOrDbError = (resolve, reject, empty) => {
    return (err, data) => {
        if (err)
            reject(new DBError(err.message));
        else
            resolve(data || empty);
    }
}

const dbAll = (query, params) => {
    try {
        return new Promise((resolve, reject) => {
            db.all(query, params, fetchDataOrDbError(resolve, reject, []));
        });
    } catch (dbErr) {
        throw dbErr
    }
}

const dbGet = (query, params) => {
    try {
        return new Promise((resolve, reject) => {
            db.get(query, params, fetchDataOrDbError(resolve, reject, {}));
        });
    } catch (dbErr) {
        throw dbErr
    }
}

const dbInsert = (query, params) => {
    try {
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    } catch (err) {
        throw err
    }
}

export const dbUpdate = (query, params) => {
    try {
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(this.changes);
                }
            });
        });
    } catch (err) {
        throw err
    }
}

export { dbAll, dbGet, dbInsert }