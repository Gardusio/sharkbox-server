import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import { authenticate } from './src/auth/passport/config.js';
import { authRouter } from './src/auth/authRouter.js';
import { userErrorHandler } from './src/users/errors.js';
import { authErrorHandler } from './src/auth/authErrors.js';
import { dbErrorsHandler } from './src/utils/db/dbErrors.js';
import { usersRouter } from './src/users/router.js';
import { lessonRouter } from './src/lessons/router.js';
import { requestValidationErrorHandler } from './src/utils/validation/validationErrors.js';
import { courseRouter } from './src/courses/router.js';
import { slotRouter } from './src/slots/router.js';
import { courseErrorHandler } from './src/courses/errors.js';

dotenv.config()

const port = process.env.PORT || 8080;
const app = express();

mongoose.set('strictQuery', true);

// Set up and enable Cross-Origin Resource Sharing (CORS)
const corsOptions = {
  origin: process.env.CROSS_ORIGIN || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
//app.use(morgan('dev'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(authenticate);


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/slots', slotRouter);
app.use('/api/v1/lessons', lessonRouter);


app.use(dbErrorsHandler);
app.use(requestValidationErrorHandler);;
app.use(userErrorHandler);
app.use(authErrorHandler);
app.use(courseErrorHandler);

export { app, port };