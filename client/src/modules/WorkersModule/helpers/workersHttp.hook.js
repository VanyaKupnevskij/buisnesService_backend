import { useAuth } from '../../../hooks/auth.hook';
import { useHttp } from '../../../hooks/http.hook';

export function useWorkersHttp() {
  const { loading, request, error } = useHttp();
  const { token } = useAuth();

  async function requestWorkers() {
    try {
      const responceWorkers = await request({
        url: '/workers',
        method: 'get',
        bearerToken: token,
      });

      return responceWorkers;
    } catch (e) {}
  }

  async function createWorker(newDataWorker) {
    try {
      const responceWorker = await request({
        url: '/workers/create',
        method: 'post',
        bearerToken: token,
        data: newDataWorker,
      });

      return responceWorker;
    } catch (e) {}
  }
  async function deleteWorker(id) {
    try {
      const responce = await request({
        url: '/workers/' + id,
        method: 'delete',
        bearerToken: token,
      });

      return responce;
    } catch (e) {}
  }

  return {
    deleteWorker,
    createWorker,
    requestWorkers,
    loading,
    error,
  };
}
