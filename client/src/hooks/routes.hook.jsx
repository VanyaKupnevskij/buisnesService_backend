import MainPage from '../pages/Main';
import ProfilePage from '../pages/Profile';
import ContactsPage from '../pages/Contacts';

import ProjectsPage from '../pages/Projects';
import GeneralPage from '../pages/General';
import RecordsPage from '../pages/Records';
import WorkersPage from '../pages/Workers';
import GraphicsPage from '../pages/Graphics';

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useProject } from './projects.hook';

export function useRoutes(isAuthenticated) {
  const { hasSelected } = useProject();

  return (
    <Routes>
      <Route index path="/" exact element={<MainPage />} />
      <Route path="/contacts" exact element={<ContactsPage />} />
      <Route path="/profile" exact element={<ProfilePage />} />

      {isAuthenticated && (
        <>
          <Route path="/projects" element={<ProjectsPage />} />
          {hasSelected && (
            <>
              <Route path="/general" element={<GeneralPage />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/workers" element={<WorkersPage />} />
              <Route path="/graphics" element={<GraphicsPage />} />
            </>
          )}
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
