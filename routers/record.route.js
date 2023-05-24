import { Router } from 'express';

import GetAllSessionsAction from '../actions/session/GetAllSessionsAction.js';
import CreateSessionAction from '../actions/session/CreateSessionAction.js';
import GetSessionAction from '../actions/session/GetSessionAction.js';
import DeleteSessionAction from '../actions/session/DeleteSessionAction.js';
import BuyTicketAction from '../actions/session/BuyTicketAction.js';

import auth from '../middlewares/auth.middleware.js';

const router = new Router();

const getAllSessionsAction = new GetAllSessionsAction();
const createSessionAction = new CreateSessionAction();
const getSessionAction = new GetSessionAction();
const deleteSessionAction = new DeleteSessionAction();
const buyTicketAction = new BuyTicketAction();

router.get('/', auth, getAllSessionsAction.run);
router.post('/create', auth, createSessionAction.run);
router.get('/:id', auth, getSessionAction.run);
router.delete('/:id', auth, deleteSessionAction.run);
router.post('/buy/:id', auth, buyTicketAction.run);

export default router;
