import { Router } from 'express';

import GetAllCinemasAction from '../actions/cinema/GetAllCinemasAction.js';
import CreateCinemaAction from '../actions/cinema/CreateCinemaAction.js';
import GetCinemaAction from '../actions/cinema/GetCinemaAction.js';
import DeleteCinemaAction from '../actions/cinema/DeleteCinemaAction.js';

import auth from '../middlewares/auth.middleware.js';

const cinemaRouter = new Router();

const getAllCinemasAction = new GetAllCinemasAction();
const createCinemaAction = new CreateCinemaAction();
const getCinemaAction = new GetCinemaAction();
const deleteCinemaAction = new DeleteCinemaAction();

cinemaRouter.get('/', auth, getAllCinemasAction.run);
cinemaRouter.post('/create', auth, createCinemaAction.run);
cinemaRouter.get('/:id', auth, getCinemaAction.run);
cinemaRouter.delete('/:id', auth, deleteCinemaAction.run);

export default cinemaRouter;
