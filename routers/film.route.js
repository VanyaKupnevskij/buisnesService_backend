import { Router } from 'express';

import GetAllFilmsAction from '../actions/film/GetAllFilmsAction.js';
import CreateFilmAction from '../actions/film/CreateFilmAction.js';

const filmRouter = new Router();

const getAllFilmsAction = new GetAllFilmsAction();
const createFilmAction = new CreateFilmAction();

filmRouter.get('/', getAllFilmsAction.run);
filmRouter.post('/create', createFilmAction.run);

export default filmRouter;
