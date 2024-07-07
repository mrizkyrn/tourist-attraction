import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/api/tourist-attractions`,
   withCredentials: true,
});

export const create = async (formData: any) => {
   try {
      const response = await api.post('/', formData);
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

export const getByUsername = async (username: string) => {
   try {
      const response = await api.get(`/username/${username}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

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

export const getAttractionsByStatus = async (status: string) => {
   try {
      const response = await api.get(`/status/${status}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

export const approveAttraction = async (id: number) => {
   try {
      const response = await api.post(`${id}/approve`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const rejectAttraction = async (id: number) => {
   try {
      const response = await api.post(`${id}/reject`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};