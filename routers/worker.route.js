import { Router } from 'express';

import GetAllWorkersAction from '../actions/worker/GetAllWorkersAction.js';
import CreateWorkerAction from '../actions/worker/CreateWorkerAction.js';
import GetWorkerAction from '../actions/worker/GetWorkerAction.js';
import DeleteWorkerAction from '../actions/worker/DeleteWorkerAction.js';

import auth from '../middlewares/auth.middleware.js';

const router = new Router();

const getAllWorkersAction = new GetAllWorkersAction();
const createWorkerAction = new CreateWorkerAction();
const getWorkerAction = new GetWorkerAction();
const deleteWorkerAction = new DeleteWorkerAction();

router.get('/', auth, getAllWorkersAction.run);
router.post('/create', auth, createWorkerAction.run);
router.get('/:id', auth, getWorkerAction.run);
router.delete('/:id', auth, deleteWorkerAction.run);

export default router;
