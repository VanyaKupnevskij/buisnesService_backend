import { useAuth } from '../../../hooks/auth.hook';
import { useHttp } from '../../../hooks/http.hook';
import { useProject } from '../../../hooks/projects.hook';

export function useRecordsHttp() {
  const { loading, request, error } = useHttp();
  const { selectedId } = useProject();
  const { token } = useAuth();

  async function requestRecords(params) {
    params.projects_id = selectedId;

    try {
      const responceRecords = await request({
        url: '/records',
        method: 'get',
        bearerToken: token,
        params,
      });

      return responceRecords;
    } catch (e) {}
  }
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
  async function updateRecord(newDataRecord) {
    try {
      const responceRecord = await request({
        url: '/records/update/' + newDataRecord.id,
        method: 'put',
        bearerToken: token,
        data: newDataRecord,
      });

      return responceRecord;
    } catch (e) {}
  }
  async function createRecord(newDataRecord) {
    newDataRecord.projects_id = selectedId;

    try {
      const responceRecord = await request({
        url: '/records/create',
        method: 'post',
        bearerToken: token,
        data: newDataRecord,
      });

      return responceRecord;
    } catch (e) {}
  }
  async function deleteRecord(id) {
    try {
      const responce = await request({
        url: '/records/' + id,
        method: 'delete',
        bearerToken: token,
      });

      return responce;
    } catch (e) {}
  }

  return {
    deleteRecord,
    createRecord,
    updateRecord,
    requestWorkers,
    requestRecords,
    loading,
    error,
  };
}
