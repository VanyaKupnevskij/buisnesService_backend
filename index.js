import express from 'express';
import 'express-async-errors';

import workerRouter from './routers/worker.route.js';
import recordRouter from './routers/record.route.js';
import projectRouter from './routers/project.route.js';
import authRouter from './routers/auth.route.js';

import cors from './middlewares/cors.middleware.js';
import error from './middlewares/error.middleware.js';
import config from 'config';
import * as path from 'path';

const app = express();

const PORT = config.get('port') || 4444;

app.use(cors);
app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/workers/', workerRouter);
app.use('/api/records/', recordRouter);
app.use('/api/projects/', projectRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(error);

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server start OK on port: ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
}

start();
