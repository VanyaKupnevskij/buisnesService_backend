import express from 'express';
import 'express-async-errors';
import cinemaRouter from './routers/cinema.route.js';
import sessionRouter from './routers/session.route.js';
import filmRouter from './routers/film.route.js';
import cors from './middlewares/cors.middleware.js';
import error from './middlewares/error.middleware.js';
import config from 'config';
import * as path from 'path';

const app = express();

const PORT = config.get('port') || 4444;

app.use(cors);
app.use(express.json({ extended: true }));

app.use('/api/cinemas/', cinemaRouter);
app.use('/api/sessions/', sessionRouter);
app.use('/api/films/', filmRouter);

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
