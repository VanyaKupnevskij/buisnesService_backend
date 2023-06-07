import { useAuth } from '../../../hooks/auth.hook';
import { useHttp } from '../../../hooks/http.hook';

export function useProjectsHttp() {
  const { loading, request, error } = useHttp();
  const { token } = useAuth();

  async function requestProjects() {
    try {
      const responceProjects = await request({
        url: '/projects',
        method: 'get',
        bearerToken: token,
      });

      return responceProjects;
    } catch (e) {}
  }

  async function createProject(newDataProject) {
    try {
      const responceProject = await request({
        url: '/projects/create',
        method: 'post',
        bearerToken: token,
        data: newDataProject,
      });

      return responceProject;
    } catch (e) {}
  }

  return {
    createProject,
    requestProjects,
    loading,
    error,
  };
}
