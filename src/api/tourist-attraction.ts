import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/api/tourist-attractions`,
   withCredentials: true,
});

export const create = async (formData: any) => {
   try {
      const response = await api.post('/', formData);
      console.log(response.data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const search = async (params: any) => {
   try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value));
      const response = await api.get('/', { params: filteredParams });
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const getDetails = async (id: number) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};