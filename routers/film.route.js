import { Router } from 'express';

import GetAllFilmsAction from '../actions/film/GetAllFilmsAction.js';
import CreateFilmAction from '../actions/film/CreateFilmAction.js';

import auth from '../middlewares/auth.middleware.js';

const filmRouter = new Router();

const getAllFilmsAction = new GetAllFilmsAction();
const createFilmAction = new CreateFilmAction();

filmRouter.get('/', auth, getAllFilmsAction.run);
filmRouter.post('/create', auth, createFilmAction.run);

export default filmRouter;
