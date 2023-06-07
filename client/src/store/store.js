import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from '../modules/ProjectsModule';
import { authReducer } from '../modules/AuthorizationModule';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});
