import { Report } from '../interfaces/report';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const reportApi = {
  postReport: async (id: string, payload: Report): Promise<void> => {
    return await apiClient.post(endpoints.report.report(id), payload);
  },
};

export default reportApi;
