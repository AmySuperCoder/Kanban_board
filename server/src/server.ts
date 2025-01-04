const forceDatabaseRefresh = false;
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Request, Response } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));


app.use(express.json());
app.use(routes);
app.get("/*", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html") 
  )
})

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
