import express from 'express';
import dotenv from 'dotenv';

import { routes, connectDB } from './src'

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB()

app.use(routes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});