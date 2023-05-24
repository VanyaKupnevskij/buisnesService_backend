import { Router } from 'express';

import GetAllCinemasAction from '../actions/worker/GetAllCinemasAction.js';
import CreateWorkerAction from '../actions/worker/CreateWorkerAction.js';
import GetCinemaAction from '../actions/worker/GetCinemaAction.js';
import DeleteCinemaAction from '../actions/worker/DeleteCinemaAction.js';

import auth from '../middlewares/auth.middleware.js';

const router = new Router();

const getAllCinemasAction = new GetAllCinemasAction();
const createWorkerAction = new CreateWorkerAction();
const getCinemaAction = new GetCinemaAction();
const deleteCinemaAction = new DeleteCinemaAction();

router.get('/', auth, getAllCinemasAction.run);
router.post('/create', auth, createWorkerAction.run);
router.get('/:id', auth, getCinemaAction.run);
router.delete('/:id', auth, deleteCinemaAction.run);

export default router;
