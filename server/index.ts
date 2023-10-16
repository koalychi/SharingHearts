import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { routes, connectDB } from './src'
import { auth } from './src/middleware';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(auth)

connectDB()

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});