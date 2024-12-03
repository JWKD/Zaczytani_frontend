import apiClient from './config/axios';
import endpoints from './config/endpoints';

const fileApi = {
  postFile: async (payload: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', payload, payload.name);
    const result = await apiClient.post(endpoints.file.postFile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data.fileName;
  },
};

export default fileApi;
