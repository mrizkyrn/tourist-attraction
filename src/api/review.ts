import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/api/reviews`,
   withCredentials: true,
});

export const getByAttractionId = async (attractionId: number) => {
   try {
      const response = await api.get(`/attraction/${attractionId}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

export const getByUsernameAndAttractionId = async (username: string, attractionId: number) => {
   try {
      const response = await api.get(`/username/${username}/attraction/${attractionId}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

export const create = async (formData: any) => {
   try {
      const response = await api.post('/', formData);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const update = async (id: number, formData: any) => {
   try {
      const response = await api.put(`/${id}`, formData);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const remove = async (id: number) => {
   try {
      const response = await api.delete(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};