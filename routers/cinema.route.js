import { Router } from 'express';

import GetAllCinemasAction from '../actions/cinema/GetAllCinemasAction.js';
import CreateCinemaAction from '../actions/cinema/CreateCinemaAction.js';
import GetCinemaAction from '../actions/cinema/GetCinemaAction.js';
import DeleteCinemaAction from '../actions/cinema/DeleteCinemaAction.js';

const cinemaRouter = new Router();

const getAllCinemasAction = new GetAllCinemasAction();
const createCinemaAction = new CreateCinemaAction();
const getCinemaAction = new GetCinemaAction();
const deleteCinemaAction = new DeleteCinemaAction();

cinemaRouter.get('/', getAllCinemasAction.run);
cinemaRouter.post('/create', createCinemaAction.run);
cinemaRouter.get('/:id', getCinemaAction.run);
cinemaRouter.delete('/:id', deleteCinemaAction.run);

export default cinemaRouter;
