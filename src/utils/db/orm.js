import { DBError } from "./dbErrors.js";
import { dbAll, dbGet, dbInsert, dbUpdate } from "./dbInterface.js";

export const save = (entity, table) => {
    try {
        const fields = Object.entries(entity)

        const insertFields = fields.map(([k, v]) => k.toString()).join(", ")
        const placeholders = Array.from({ length: Object.keys(fields).length }, () => '?').join(', ');
        const query = `INSERT INTO ${table} (${insertFields}) VALUES (${placeholders})`;

        return dbInsert(query, fields.map(([_, v]) => v))
    } catch (err) {
        throw new DBError(err.message)
    }
}

export const update = (entity, table) => {
    const params = Object.entries(entity)
    const keys = params.map(([k]) => k.toString());
    const values = params.map(([, v]) => v);

    const setClause = keys.map((key) => `${key} = ?`).join(', ');

    const sqlQuery = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

    const sqlValues = [...values, entity.id];

    return dbUpdate(sqlQuery, sqlValues)
}

export const remove = (id, table) => {
    const query = `DELETE FROM ${table} WHERE id=?`;

    return dbUpdate(query, id);
}

export const removeBy = (key, value, table) => {
    const query = `DELETE FROM ${table} WHERE ${key}=?`;

    return dbUpdate(query, value);
}

export const findAll = (table) => {
    const query = `SELECT * FROM ${table}`;

    return dbAll(query, []);
}

export const findById = (id, table) => {
    const query = `SELECT * FROM ${table} WHERE id=?`;

    return dbGet(query, id);
}

export const findAllBy = (field, val, table) => {
    const query = `SELECT * FROM ${table} WHERE ${field}=?`;

    return dbAll(query, val);
}

export const findBy = (field, val, table) => {
    const query = `SELECT * FROM ${table} WHERE ${field}=?`;

    return dbGet(query, val);
}

export const findAllByWith = (field, val, table1, table2Key, table2, table3Key, table3) => {
    let query = `
        SELECT ${table1}.id AS ${table1}_id, ${table1}.*, ${table2}.id AS ${table2}_id, ${table2}.*
        FROM ${table1}, ${table2} 
        WHERE ${table1}.${field} = ? AND 
        ${table1}.${table2Key} = ${table2}.id
    `

    if (table3Key && table3) {
        query = `
            SELECT ${table1}.id AS ${table1}_id, ${table1}.*, ${table2}.id AS ${table2}_id, ${table2}.*, ${table3}.id AS ${table3}_id, ${table3}.*
            FROM ${table1}, ${table2}, ${table3} 
            WHERE ${table1}.${field} = '${val}' AND 
            ${table1}.${table2Key} = ${table2}.id AND
            ${table1}.${table3Key} = ${table3}.id
        `
        return dbAll(query, []);
    }

    return dbAll(query, val);
}

export const findByWith = (field, val, table1, table2Key, table2, table3Key, table3) => {
    let query = `
        SELECT * 
        FROM ${table1}, ${table2} 
        WHERE ${table1}.${field} = ? AND 
        ${table1}.${table2Key} = ${table2}.id
    `
    /*
    if (table3Key && table3) {
        query = `
            SELECT * 
            FROM ${table1}, ${table2}, ${table3} 
            WHERE ${table1}.${field} = '${val}' AND 
            ${table1}.${table2Key} = ${table2}.id AND
            ${table1}.${table3Key} = ${table3}.id
        `

        return dbGet(query, []);
    }
    */

    return dbGet(query, val);
}

/*
export const findByTwoWith = (field, val, field1, val1, table1, table2Key, table2, table3Key, table3) => {

    let query = `
        SELECT ${table1}.id AS ${table1}_id, ${table1}.*, ${table2}.*
        FROM ${table1}, ${table2} 
        WHERE ${table1}.${field} = ${val} AND 
        ${table1}.${field1} = ${val1} AND 
        ${table1}.${table2Key} = ${table2}.id
    `

    if (table3Key && table3) {
        query = `
            SELECT ${table1}.id AS ${table1}_id, ${table1}.*, ${table2}.*, ${table3}.*
            FROM ${table1}, ${table2}, ${table3} 
            WHERE ${table1}.${field} = '${val}' AND 
            ${table1}.${table2Key} = ${table2}.id AND
            ${table1}.${table3Key} = ${table3}.id
        `

        return dbGet(query, []);
    }
    const lesson = dbGet(query, []);

    return lesson;
}
*/
