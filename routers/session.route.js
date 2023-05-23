import { Router } from 'express';

import GetAllSessionsAction from '../actions/session/GetAllSessionsAction.js';
import CreateSessionAction from '../actions/session/CreateSessionAction.js';
import GetSessionAction from '../actions/session/GetSessionAction.js';
import DeleteSessionAction from '../actions/session/DeleteSessionAction.js';
import BuyTicketAction from '../actions/session/BuyTicketAction.js';

const sessionRouter = new Router();

const getAllSessionsAction = new GetAllSessionsAction();
const createSessionAction = new CreateSessionAction();
const getSessionAction = new GetSessionAction();
const deleteSessionAction = new DeleteSessionAction();
const buyTicketAction = new BuyTicketAction();

sessionRouter.get('/', getAllSessionsAction.run);
sessionRouter.post('/create', createSessionAction.run);
sessionRouter.get('/:id', getSessionAction.run);
sessionRouter.delete('/:id', deleteSessionAction.run);
sessionRouter.post('/buy/:id', buyTicketAction.run);

export default sessionRouter;
