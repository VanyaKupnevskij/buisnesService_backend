import { Router } from 'express';

import CreateProjectAction from '../actions/project/CreateProjectAction.js';
import GetAllProjectsAction from '../actions/project/GetAllProjectsAction.js';

import auth from '../middlewares/auth.middleware.js';

const router = new Router();

const createProjectAction = new CreateProjectAction();
const getAllProjectsAction = new GetAllProjectsAction();

router.post('/create', auth, createProjectAction.run);
router.get('/', auth, getAllProjectsAction.run);

export default router;
