import { FilePost } from '../interfaces/file';
import apiClient from './config/axios';
import endpoints from './config/endpoints';

const dataApi = {
  postFile: async (payload: File): Promise<FilePost> => {
    const formData = new FormData();
    formData.append('file', payload, payload.name);
    const result = await apiClient.post(endpoints.file.postFile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    let file: FilePost = {
      fileName: result.data.fileName,
    };
    return file;
  },
};

export default dataApi;
