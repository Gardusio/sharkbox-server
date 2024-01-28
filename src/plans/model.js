import { Schema, model } from 'mongoose';

/**
 * 
 * Nome
 * Costo
 * La durata 
 * Lezioni a settimana (num)
 * 
 * https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
 * 
 */

const schema = new Schema({
   // DEFINE A PLAN IN A JAVASCRIPT OBJ
});

const Courses = model('courses', schema);

export default Courses;
