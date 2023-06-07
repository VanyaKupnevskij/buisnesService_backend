import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { diselectAction, setSelectedAction } from '../modules/ProjectsModule/store/reducer';

export function useProject() {
  const { selectedId, hasSelected } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const selectProject = useCallback((id) => {
    if (!id) return;

    dispatch(setSelectedAction({ id }));
  }, []);

  const diselectProject = useCallback(() => {
    dispatch(diselectAction());
  }, []);

  return { selectProject, diselectProject, selectedId, hasSelected };
}
