import { Router } from 'express';

import GetAllSessionsAction from '../actions/session/GetAllSessionsAction.js';
import CreateSessionAction from '../actions/session/CreateSessionAction.js';
import GetSessionAction from '../actions/session/GetSessionAction.js';
import DeleteSessionAction from '../actions/session/DeleteSessionAction.js';
import BuyTicketAction from '../actions/session/BuyTicketAction.js';

import auth from '../middlewares/auth.middleware.js';

const sessionRouter = new Router();

const getAllSessionsAction = new GetAllSessionsAction();
const createSessionAction = new CreateSessionAction();
const getSessionAction = new GetSessionAction();
const deleteSessionAction = new DeleteSessionAction();
const buyTicketAction = new BuyTicketAction();

sessionRouter.get('/', auth, getAllSessionsAction.run);
sessionRouter.post('/create', auth, createSessionAction.run);
sessionRouter.get('/:id', auth, getSessionAction.run);
sessionRouter.delete('/:id', auth, deleteSessionAction.run);
sessionRouter.post('/buy/:id', auth, buyTicketAction.run);

export default sessionRouter;
